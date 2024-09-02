from django.urls import include, path
from problem.views import ProblemCategoryViewSet, ProblemViewSet
from rest_framework.routers import DefaultRouter

router_problem = DefaultRouter()
router_problem.register(prefix="category", viewset=ProblemCategoryViewSet)
router_problem.register(prefix="problem", viewset=ProblemViewSet)

urlpatterns = [path("api/", include((router_problem.urls, "problem-api-v1")))]
