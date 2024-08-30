from core.mixins import ActionBasedViewSetMixin
from core.permissions import check_object_permissions
from rest_framework import viewsets
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from restore.models import Restore, RestoreCategory
from restore.serializers import ManagerRestoreSerializer, RestoreCategoryListSerializer, RestoreListSerializer


class RestoreCategoryListView(ListAPIView):
    queryset = RestoreCategory.objects.all()
    serializer_class = RestoreCategoryListSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self, *args, **kwargs):
        category_name = self.request.query_params.get("categoryName", None)
        self.queryset = self.queryset.filter(main_category__name=category_name)
        check_object_permissions(self, category_name)
        return self.queryset


class RestoreView(ListAPIView):
    queryset = Restore.objects.all()
    serializer_class = RestoreListSerializer

    def list(self, request, *args, **kwargs):
        category_name = self.request.query_params.get("categoryName")
        version = self.request.query_params.get("version")

        self.queryset = Restore.objects.filter(category__main_category__name=category_name, category__version=version)

        serializer = self.serializer_class(self.queryset, many=True)

        return Response(serializer.data)


# Manager
class ManagerRestoreView(ActionBasedViewSetMixin, viewsets.ModelViewSet):
    queryset = Restore.objects.all()
    queryset_map = {
        "list": ManagerRestoreSerializer.get_optimized_queryset(),
        "partial_update": ManagerRestoreSerializer.get_optimized_queryset(),
        "destroy": Restore.objects.all(),
    }
    serializer_class = ManagerRestoreSerializer
