from django.urls import include, path
from rest_framework.routers import DefaultRouter

router_restore = DefaultRouter()

urlpatterns = [path("api/", include((router_restore.urls, "restore-api-v1")))]
