from rest_framework.generics import ListAPIView
from restore.models import Restore, RestoreCategory
from restore.serializers import RestoreCategoryListSerializer, RestoreListSerializer


class RestoreCategoryListView(ListAPIView):
    queryset = RestoreCategory.objects.all()
    serializer_class = RestoreCategoryListSerializer


class RestoreView(ListAPIView):
    queryset = Restore.objects.all()
    serializer_class = RestoreListSerializer

    def list(self, request, *args, **kwargs):
        self.queryset = Restore.objects.filter(category__name=kwargs["category"], category__version=kwargs["version"])
        return super().list(request, *args, **kwargs)
