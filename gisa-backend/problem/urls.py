from django.urls import include, path
from problem.views import ProblemCategoryView, ProblemViewSet
from rest_framework.routers import DefaultRouter

router_problem = DefaultRouter()
router_problem.register(prefix="problem", viewset=ProblemViewSet)

urlpatterns = [
    path("api/category/", ProblemCategoryView.as_view(), name="자격증 별, 필기 회차"),
    path("api/", include((router_problem.urls, "problem-api-v1"))),
]
