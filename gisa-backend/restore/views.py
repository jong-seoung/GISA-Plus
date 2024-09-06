from core.mixins import ActionBasedViewSetMixin
from core.models import MainCategory
from core.permissions import IsCategorySubscriber
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from restore.models import Restore, RestoreCategory
from restore.serializers import RestoreCategoryListSerializer, RestoreListSerializer, RestoreSerializer


class RestoreCategoryListView(ModelViewSet):
    queryset = RestoreCategory.objects.all()
    serializer_class = RestoreCategoryListSerializer
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


class RestoreView(ActionBasedViewSetMixin, ModelViewSet):
    queryset = Restore.objects.all()
    queryset_map = {"partial_update": RestoreSerializer.get_optimized_queryset(), "destroy": Restore.objects.all()}
    serializer_class = RestoreListSerializer
    serializer_class_map = {
        "list": RestoreListSerializer,
        "create": RestoreSerializer,
        "partial_update": RestoreSerializer,
    }
    permission_classes = [IsAuthenticated, IsCategorySubscriber]

    def list(self, request, *args, **kwargs):
        category_name = self.request.query_params.get("categoryName")
        version = self.request.query_params.get("version")

        self.queryset = Restore.objects.filter(category__main_category__name=category_name, category__version=version)

        return super().list(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        print(request.data)
        return super().update(request, *args, **kwargs)
