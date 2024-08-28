from core.mixins import ActionBasedViewSetMixin
from problem.models import Problem
from problem.serializers import ProblemDetailSerializer, ProblemListSerializer, ProblemSerializer
from rest_framework import viewsets


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
