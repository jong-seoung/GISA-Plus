from django.urls import include, path
from rest_framework.routers import DefaultRouter

router_problem = DefaultRouter()
# router_problem.register(prefix="other", viewset=OtherViewSet)

urlpatterns = []

urlpatterns_problem = []
urlpatterns_problem += router_problem.urls

# `problem` 앱의 네임스페이스를 "problem-api-v1"로 지정
urlpatterns += [path("api/", include((urlpatterns_problem, "problem-api-v1")))]
