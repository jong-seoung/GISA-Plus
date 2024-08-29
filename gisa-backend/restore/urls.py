from django.urls import include, path
from rest_framework.routers import DefaultRouter
from restore.views import ManagerRestoreView, RestoreCategoryListView, RestoreView

router_restore = DefaultRouter()
# router_restore.register(prefix="manager/<str:category>/<str:version>", viewset=ManagerRestoreView)

urlpatterns = [
    path("api/category/<str:category>", RestoreCategoryListView.as_view()),
    path("api/restore/<str:category>/<str:version>", RestoreView.as_view()),
    path("api/manager/<str:category>", RestoreCategoryListView.as_view()),
    path("api/manager/<str:category>/<str:version>/", ManagerRestoreView.as_view({"get": "list", "post": "create"})),
    path(
        "api/manager/<str:category>/<str:version>/<int:pk>/",
        ManagerRestoreView.as_view({"patch": "partial_update", "delete": "destroy"}),
    ),
    path("api/", include((router_restore.urls, "restore-api-v1"))),
]
