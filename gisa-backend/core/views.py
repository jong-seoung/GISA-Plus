from core.models import MainCategory
from core.serializers import MainCategorySerializer
from rest_framework.generics import ListAPIView


class MainCategoryListView(ListAPIView):
    queryset = MainCategory.objects.all()
    serializer_class = MainCategorySerializer
