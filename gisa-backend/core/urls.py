from core.views import MainCategoryListView
from django.urls import path

urlpatterns = [path("category-list", MainCategoryListView.as_view(), name="자격증 목록")]
