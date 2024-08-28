from core.mixins import ActionBasedViewSetMixin
from problem.models import Problem, ProblemCategory
from problem.serializers import (
    ProblemCategorySerializer,
    ProblemDetailSerializer,
    ProblemListSerializer,
    ProblemSerializer,
)
from rest_framework import mixins, viewsets


class ProblemViewSet(ActionBasedViewSetMixin, viewsets.ModelViewSet):
    queryset = Problem.objects.all()
    queryset_map = {
        "list": ProblemListSerializer.get_optimized_queryset(),
        "retrieve": ProblemDetailSerializer.get_optimized_queryset(),
        "update": ProblemSerializer.get_optimized_queryset(),
        "partial_update": ProblemSerializer.get_optimized_queryset(),
        "destroy": Problem.objects.all(),
    }
    serializer_class = ProblemSerializer
    serializer_class_map = {
        "list": ProblemListSerializer,
        "retrieve": ProblemDetailSerializer,
        "create": ProblemSerializer,
        "update": ProblemSerializer,
        "partial_update": ProblemSerializer,
    }


class ProblemCategoryView(mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset = ProblemCategory.objects.all()
    serializer_class = ProblemCategorySerializer

    def get_queryset(self, *args, **kwargs):
        category_name = self.kwargs.get("category_name", None)
        self.queryset = self.queryset.filter(name=category_name)

        return self.queryset
