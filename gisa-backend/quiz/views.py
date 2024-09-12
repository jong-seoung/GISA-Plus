import random

from core.mixins import ActionBasedViewSetMixin
from core.permissions import IsCategorySubscriber
from django_filters.rest_framework import DjangoFilterBackend
from quiz.models import Category, Quiz, QuizSave, Unit
from quiz.serializers import (
    BasicUnitSerializer,
    CategorySerializer,
    QuizDetailSerializer,
    QuizListSerializer,
    QuizSaveSerializer,
    QuizSerializer,
)
from rest_framework import status
from rest_framework.filters import SearchFilter
from rest_framework.generics import ListAPIView
from rest_framework.mixins import (
    CreateModelMixin,
    DestroyModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
)
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet, ModelViewSet


class QuizPagination(PageNumberPagination):
    page_size = 10


# Unit 뷰 - Create, Update, Delete만 지원
class UnitViewSet(GenericViewSet, CreateModelMixin, UpdateModelMixin, DestroyModelMixin):
    queryset = Unit.objects.all()
    serializer_class = BasicUnitSerializer

    permission_classes = [IsAuthenticated | IsCategorySubscriber]


# Category 뷰 - Create, List, Update, Destory
class CategoryViewSet(GenericViewSet, CreateModelMixin, ListModelMixin, UpdateModelMixin, DestroyModelMixin):
    queryset = Category.objects.all().prefetch_related("category_unit")
    serializer_class = CategorySerializer

    permission_classes = [IsAuthenticated | IsCategorySubscriber]


# 데일리 퀴즈
class QuizlListView(ListAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizDetailSerializer

    permission_classes = [IsAuthenticated | IsCategorySubscriber]

    def list(self, request, *args, **kwargs):
        request.user
        category_name = request.query_params.get("categoryName")
        exclude_id = request.query_params.get("exclude_id", None)

        if not category_name:
            return Response({"error": "categoryName parameter is required"}, status=status.HTTP_400_BAD_REQUEST)

        quiz = (
            Quiz.objects.filter(unit__category__main_category__name=category_name)
            .select_related("unit")
            .exclude(id=exclude_id)
        )

        count = quiz.count()

        if count == 0:
            return None

        random_index = random.randint(0, count - 1) if count > 1 else 0

        selected_quiz = quiz[random_index]
        serializer = self.get_serializer(selected_quiz)

        return Response(serializer.data)


# 데일리 퀴즈 관리 - Create, List, Retrieve, Update, Destory
class QuizModelViewSet(ActionBasedViewSetMixin, ModelViewSet):
    queryset = Quiz.objects.all()
    queryset_map = {
        "retrieve": QuizDetailSerializer.get_optimized_queryset(),
        #     "partial_update": QuizSerializer.get_optimized_queryset(),
        "list": QuizListSerializer.get_optimized_queryset(),
        #     "destroy": Quiz.objects.all(),
    }
    serializer_class = QuizSerializer
    serializer_class_map = {
        "retrieve": QuizDetailSerializer,
        "list": QuizListSerializer,
        #     "create": QuizSerializer,
        #     "partial_update": QuizSerializer,
    }
    pagination_class = QuizPagination
    filter_backends = [DjangoFilterBackend, SearchFilter]
    search_fields = ["title", "content"]
    filterset_fields = ["unit__category__version", "unit__name", "unit__category__main_category__name"]
    permission_classes = [IsAuthenticated | IsCategorySubscriber]


# 저장된 퀴즈 - Create, Delete, Retrieve, List
class QuizSaveViewSet(
    ActionBasedViewSetMixin, GenericViewSet, CreateModelMixin, DestroyModelMixin, ListModelMixin, RetrieveModelMixin
):
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

        return Response(response_data)

    def list(self, request, *args, **kwargs):
        user = request.user

        saved_quiz_ids = QuizSave.objects.filter(user=user).values_list("quiz_id", flat=True)

        if not saved_quiz_ids:
            return Response({"error": "No saved quizzes found"}, status=status.HTTP_404_NOT_FOUND)

        quiz_list = (
            Quiz.objects.filter(id__in=saved_quiz_ids).select_related("unit__category").prefetch_related("photo_set")
        )

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
