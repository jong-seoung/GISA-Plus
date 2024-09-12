from core.mixins import ActionBasedViewSetMixin
from core.models import MainCategory
from core.permissions import IsCategorySubscriber
from problem.models import Problem, ProblemCategory
from problem.serializers import ProblemCategorySerializer, ProblemListSerializer, ProblemSerializer
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet


class ProblemCategoryViewSet(ModelViewSet):
    queryset = ProblemCategory.objects.all().order_by("-version")
    serializer_class = ProblemCategorySerializer
    permission_classes = [IsAuthenticated | IsCategorySubscriber]

    def list(self, request, *args, **kwargs):
        category_name = self.request.query_params.get("categoryName", None)
        filtered_queryset = self.queryset.filter(main_category__name=category_name)  # 지역 변수에 저장
        return super().list(request, queryset=filtered_queryset, *args, **kwargs)

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
        "create": ProblemSerializer,
        "update": ProblemSerializer,
        "partial_update": ProblemSerializer,
    }
    permission_classes = [IsAuthenticated | IsCategorySubscriber]

    def list(self, request, *args, **kwargs):
        # 쿼리 파라미터에서 'category'와 'version'을 가져옴
        category = self.request.query_params.get("categoryName", None)
        version = self.request.query_params.get("version", None)

        # queryset을 필터링
        queryset = (
            self.queryset.filter(category__main_category__name=category, category__version=version)
            .prefetch_related("problemanswer_set", "problemphoto_set")
            .order_by("num")
        )

        # 필터링된 쿼리셋을 직렬화기에 전달
        serializer = ProblemListSerializer(queryset, many=True)  # many=True는 다수의 객체를 직렬화할 때 필요
        return Response(serializer.data)
