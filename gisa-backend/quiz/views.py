from core.mixins import ActionBasedViewSetMixin
from quiz.models import Category, Quiz
from quiz.serializers import CategoryListSerializer, QuizDetailSerializer, QuizListSerializer, QuizSerializer
from rest_framework import generics
from rest_framework.mixins import ListModelMixin
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
