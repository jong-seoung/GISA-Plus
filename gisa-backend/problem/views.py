from core.mixins import ActionBasedViewSetMixin
from core.models import MainCategory
from core.permissions import IsCategorySubscriber
from problem.models import Problem, ProblemCategory
from problem.serializers import ProblemCategorySerializer, ProblemListSerializer, ProblemSerializer
from rest_framework import viewsets
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
        "create": ProblemSerializer,
        # "update": ProblemSerializer,
        # "partial_update": ProblemSerializer,
    }
    permission_classes = [IsAuthenticated, IsCategorySubscriber]

    def get_queryset(self):
        queryset = self.queryset_map.get(self.action, self.queryset)

        # 쿼리 파라미터에서 'category'와 'version'을 가져옴
        category = self.request.query_params.get("categoryName", None)
        version = self.request.query_params.get("version", None)

        queryset = queryset.filter(category__main_category__name=category)
        queryset = queryset.filter(category__version=version)

        return queryset

    def create(self, request, *args, **kwargs):
        print("Request Data:", self.request.data)
        # Serializer를 인스턴스화하여 데이터를 전달
        serializer = self.get_serializer(data=request.data)
        # 유효성 검사 수행
        if not serializer.is_valid():
            # 유효성 검사 실패 시 오류 메시지 출력
            print("Validation Errors:", serializer.errors)
            # 유효성 검사 실패 시 적절한 응답을 반환

        return super().create(request, *args, **kwargs)
