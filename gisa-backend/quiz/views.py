from core.mixins import ActionBasedViewSetMixin
from quiz.models import Category, Quiz
from quiz.serializers import CategoryListSerializer, QuizDetailSerializer, QuizListSerializer, QuizSerializer
from rest_framework import generics
from rest_framework.mixins import ListModelMixin
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet


class CategoryList(generics.GenericAPIView, ListModelMixin):
    queryset = Category.objects.all()
    serializer_class = CategoryListSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class QuizModelViewSet(ActionBasedViewSetMixin, ModelViewSet):
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
        id = kwargs.get("pk")

        # 데이터베이스에서 직접 랜덤 퀴즈를 선택 (PostgreSQL의 경우)
        other_quizzes = (
            Quiz.objects.filter()
            .exclude(id=id)
            .order_by("?")
            .select_related("unit")
            .prefetch_related("photo_set")
            .first()
        )

        random_quiz_data = self.get_serializer(other_quizzes).data

        return Response(random_quiz_data)
