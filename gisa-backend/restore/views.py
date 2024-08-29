from core.mixins import ActionBasedViewSetMixin
from rest_framework import viewsets
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from restore.models import Restore, RestoreCategory
from restore.serializers import ManagerRestoreSerializer, RestoreCategoryListSerializer, RestoreListSerializer


class RestoreCategoryListView(ListAPIView):
    queryset = RestoreCategory.objects.all()
    serializer_class = RestoreCategoryListSerializer


class RestoreView(ListAPIView):
    queryset = Restore.objects.all()
    serializer_class = RestoreListSerializer

    def list(self, request, *args, **kwargs):
        self.queryset = Restore.objects.filter(category__name=kwargs["category"], category__version=kwargs["version"])

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
