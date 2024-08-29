from rest_framework.generics import ListAPIView
from restore.models import RestoreCategory
from restore.serializers import RestoreCategoryListSerializer


class RestoreCategoryListView(ListAPIView):
    queryset = RestoreCategory.objects.all()
    serializer_class = RestoreCategoryListSerializer

    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)
