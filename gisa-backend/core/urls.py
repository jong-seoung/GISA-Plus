from core.views import MainCategoryListView, temporary_permission
from django.urls import path

urlpatterns = [
    path("category-list", MainCategoryListView.as_view(), name="자격증 목록"),
    path("temporary-permission", temporary_permission, name="권한 부여"),
]
