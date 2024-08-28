from django.urls import include, path
from problem.views import ProblemCategoryView, ProblemViewSet
from rest_framework.routers import DefaultRouter

router_problem = DefaultRouter()
router_problem.register(prefix="problem", viewset=ProblemViewSet)

urlpatterns = [
    path("api/category/<str:category_name>/", ProblemCategoryView.as_view({"get": "list"}), name="카테고리 목록"),
    path("api/", include((router_problem.urls, "problem-api-v1"))),
]
