from core.mixins import ActionBasedViewSetMixin
from core.models import MainCategory
from core.permissions import IsCategorySubscriber
from problem.models import Problem, ProblemCategory
from problem.serializers import ProblemCategorySerializer, ProblemListSerializer, ProblemSerializer
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet


class ProblemCategoryViewSet(ModelViewSet):
    queryset = ProblemCategory.objects.all().order_by("-version")
    serializer_class = ProblemCategorySerializer
    permission_classes = [IsAuthenticated, IsCategorySubscriber]

    def list(self, request, *args, **kwargs):
        category_name = self.request.query_params.get("categoryName", None)
        queryset = self.get_queryset()

        if category_name:
            queryset = queryset.filter(main_category__name=category_name)

        self.queryset = queryset
        return super().list(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        category_name = request.data.get("categoryName")

        if not category_name:
            raise ValidationError("categoryName 쿼리 파라미터가 필요합니다.")

        main_category = MainCategory.objects.get(name=category_name)

        request.data["main_category"] = main_category.id

        return super().create(request, *args, **kwargs)


class ProblemViewSet(ActionBasedViewSetMixin, ModelViewSet):
    queryset = Problem.objects.all()
    queryset_map = {
        "update": ProblemSerializer.get_optimized_queryset(),
        "partial_update": ProblemSerializer.get_optimized_queryset(),
        "destroy": Problem.objects.all(),
    }
    serializer_class = ProblemSerializer
    serializer_class_map = {
        "list": ProblemListSerializer,
        "create": ProblemSerializer,
        "update": ProblemSerializer,
        "partial_update": ProblemSerializer,
    }
    permission_classes = [IsAuthenticated, IsCategorySubscriber]

    def list(self, request, *args, **kwargs):
        self.queryset = self.queryset_map.get(self.action, self.queryset)

        # 쿼리 파라미터에서 'category'와 'version'을 가져옴
        category = self.request.query_params.get("categoryName", None)
        version = self.request.query_params.get("version", None)

        self.queryset = self.queryset.filter(category__main_category__name=category)
        self.queryset = self.queryset.filter(category__version=version).order_by("num")

        return super().list(request, *args, **kwargs)
