from core.mixins import ActionBasedViewSetMixin
from quiz.models import Quiz, QuizSave
from quiz.serializers import QuizDetailSerializer, QuizListSerializer, QuizSaveSerializer, QuizSerializer
from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


class QuizModelViewSet(ActionBasedViewSetMixin, viewsets.ModelViewSet):
    queryset = Quiz.objects.all()
    queryset_map = {
        "list": QuizListSerializer.get_optimized_queryset(),
        "retrieve": QuizDetailSerializer.get_optimized_queryset(),
        "update": QuizSerializer.get_optimized_queryset(),
        "partial_update": QuizSerializer.get_optimized_queryset(),
        "destroy": Quiz.objects.all(),
    }
    serializer_class = QuizSerializer
    serializer_class_map = {
        "list": QuizListSerializer,
        "retrieve": QuizDetailSerializer,
        "create": QuizSerializer,
        "update": QuizSerializer,
        "partial_update": QuizSerializer,
    }

    def retrieve(self, request, *args, **kwargs):
        user = request.user
        id = kwargs.get("pk")
        category_name = request.query_params.get("categoryName")  # URL 쿼리 매개변수에서 categoryName 가져오기

        # 데이터베이스에서 직접 랜덤 퀴즈를 선택 (PostgreSQL의 경우)
        other_quizzes = (
            Quiz.objects.filter(unit__category__main_category__name=category_name)
            .exclude(id=id)
            .order_by("?")
            .select_related("unit")
            .prefetch_related("photo_set")
            .first()
        )

        # 쿼리 결과가 없을 경우 처리
        if other_quizzes is None:
            return Response({"detail": "퀴즈가 없습니다."}, status=status.HTTP_404_NOT_FOUND)

        try:
            # 퀴즈 정보 직렬화
            random_quiz_data = self.get_serializer(other_quizzes).data

            # 해당 퀴즈가 저장되었는지 확인
            is_saved = QuizSave.objects.filter(user=user, quiz_id=random_quiz_data["id"]).exists()
            random_quiz_data["is_saved"] = is_saved

            return Response(random_quiz_data)
        except Exception as e:
            # 구체적인 예외 로그 추가 가능
            print(f"Error serializing quiz: {str(e)}")
            return Response({"error": "데이터 처리 중 문제가 발생했습니다."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class QuizSaveViewSet(ActionBasedViewSetMixin, viewsets.ModelViewSet):
    queryset = QuizSave.objects.all()
    serializer_class = QuizSaveSerializer
    serializer_class_map = {"list": QuizListSerializer, "retrieve": QuizDetailSerializer, "create": QuizSaveSerializer}
    permission_classes = [IsAuthenticated]

    def retrieve(self, request, *args, **kwargs):
        user = request.user
        quiz_id = kwargs.get("pk")

        saved_quizzes = list(QuizSave.objects.filter(user=user).values_list("quiz_id", flat=True).order_by("quiz_id"))

        try:
            current_index = saved_quizzes.index(int(quiz_id))
        except ValueError:
            return Response({"detail": "Quiz not found in saved list."}, status=status.HTTP_404_NOT_FOUND)

        prev_quiz_id = saved_quizzes[current_index - 1] if current_index > 0 else None
        next_quiz_id = saved_quizzes[current_index + 1] if current_index < len(saved_quizzes) - 1 else None

        quiz = Quiz.objects.get(id=quiz_id)
        serializer = self.get_serializer(quiz)

        response_data = serializer.data
        response_data["prev_quiz_url"] = f"/save/{prev_quiz_id}/" if prev_quiz_id else None
        response_data["next_quiz_url"] = f"/save/{next_quiz_id}/" if next_quiz_id else None
        is_saved = QuizSave.objects.filter(user=user, quiz_id=quiz_id).exists()
        response_data["is_saved"] = is_saved

        return Response(response_data)

    def list(self, request, *args, **kwargs):
        user = request.user

        saved_quiz_ids = QuizSave.objects.filter(user=user).values_list("quiz_id", flat=True).order_by("id")
        if not saved_quiz_ids.exists():
            return Response({"error": "no Data"}, status=status.HTTP_404_NOT_FOUND)

        quiz_list = Quiz.objects.filter(id__in=saved_quiz_ids)

        serializer = self.get_serializer(quiz_list, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        quiz_id = request.data.get("id")
        user = request.user

        if QuizSave.objects.filter(user=user, quiz_id=quiz_id).exists():
            return Response({"detail": "Quiz already saved."}, status=status.HTTP_400_BAD_REQUEST)

        QuizSave.objects.create(user=user, quiz_id=quiz_id)
        return Response({"is_saved": True}, status=status.HTTP_201_CREATED)

    def destroy(self, request, *args, **kwargs):
        quiz_id = kwargs.get("pk")
        user = request.user

        try:
            quiz_save = QuizSave.objects.get(user=user, quiz_id=quiz_id)
            quiz_save.delete()
            return Response({"detail": "Quiz unsaved."}, status=status.HTTP_204_NO_CONTENT)
        except QuizSave.DoesNotExist:
            return Response({"detail": "Quiz not found in saved list."}, status=status.HTTP_404_NOT_FOUND)
