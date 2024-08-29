from django.urls import include, path
from rest_framework.routers import DefaultRouter
from restore.views import RestoreCategoryListView

router_restore = DefaultRouter()

urlpatterns = [
    path("category", RestoreCategoryListView.as_view()),
    path("api/", include((router_restore.urls, "restore-api-v1"))),
]
