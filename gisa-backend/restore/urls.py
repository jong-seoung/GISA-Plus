from django.urls import include, path
from rest_framework.routers import DefaultRouter
from restore.views import RestoreCategoryListView, RestoreView

router_restore = DefaultRouter()
router_restore.register(prefix="category", viewset=RestoreCategoryListView)

urlpatterns = [
    path("api/restore/", RestoreView.as_view()),
    path("api/", include((router_restore.urls, "restore-api-v1"))),
]
