from core.mixins import ActionBasedViewSetMixin
from problem.models import Problem, ProblemCategory
from problem.serializers import ProblemCategorySerializer, ProblemListSerializer, ProblemSerializer
from rest_framework import viewsets
from rest_framework.exceptions import ValidationError
from rest_framework.generics import ListAPIView


class ProblemCategoryView(ListAPIView):
    queryset = ProblemCategory.objects.all()
    serializer_class = ProblemCategorySerializer

    def get_queryset(self, *args, **kwargs):
        category_name = self.kwargs.get("category_name", None)
        self.queryset = self.queryset.filter(main_category__name=category_name)

        return self.queryset


class ProblemViewSet(ActionBasedViewSetMixin, viewsets.ModelViewSet):
    queryset = Problem.objects.all()
    queryset_map = {
        # "retrieve": ProblemDetailSerializer.get_optimized_queryset(),
        # "update": ProblemSerializer.get_optimized_queryset(),
        # "partial_update": ProblemSerializer.get_optimized_queryset(),
        # "destroy": Problem.objects.all(),
    }
    serializer_class = ProblemSerializer
    serializer_class_map = {
        "list": ProblemListSerializer,
        # "retrieve": ProblemDetailSerializer,
        # "create": ProblemSerializer,
        # "update": ProblemSerializer,
        # "partial_update": ProblemSerializer,
    }

    def get_queryset(self):
        queryset = self.queryset_map.get(self.action, self.queryset)

        # 쿼리 파라미터에서 'category'와 'version'을 가져옴
        category = self.request.query_params.get("category")
        version = self.request.query_params.get("version")

        # 파라미터가 없는 경우 예외 처리
        if not category:
            raise ValidationError({"detail": "category 파라미터가 필요합니다."})
        if not version:
            raise ValidationError({"detail": "version 파라미터가 필요합니다."})

        # 필터링 적용
        queryset = queryset.filter(category__main_category__name=category)
        queryset = queryset.filter(category__version=version)

        return queryset
