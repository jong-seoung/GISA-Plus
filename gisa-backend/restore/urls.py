from django.urls import include, path
from rest_framework.routers import DefaultRouter
from restore.views import RestoreCategoryListView, RestoreView

router_restore = DefaultRouter()

urlpatterns = [
    path("api/category/<str:category>", RestoreCategoryListView.as_view()),
    path("api/restore/<str:category>/<str:version>", RestoreView.as_view()),
    path("api/", include((router_restore.urls, "restore-api-v1"))),
]
