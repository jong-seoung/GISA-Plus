from django.urls import include, path
from quiz.views import CategoryList, QuizModelViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(prefix="post", viewset=QuizModelViewSet)


urlpatterns = [path("category-list", CategoryList.as_view(), name="카테고리 목록")]

urlpatterns_api_v1 = []
urlpatterns_api_v1 += router.urls

urlpatterns += [path("api/", include((urlpatterns_api_v1, "api-v1")))]
