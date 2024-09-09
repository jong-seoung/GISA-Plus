from django.urls import include, path
from quiz.views import CategoryViewSet, QuizModelViewSet, QuizSaveViewSet, UnitViewSet
from rest_framework.routers import DefaultRouter

router_quiz = DefaultRouter()
router_quiz.register(prefix="category", viewset=CategoryViewSet)
router_quiz.register(prefix="unit", viewset=UnitViewSet)
router_quiz.register(prefix="quiz", viewset=QuizModelViewSet)
router_quiz.register(prefix="save", viewset=QuizSaveViewSet, basename="quiz-save")


urlpatterns = [path("api/", include((router_quiz.urls, "quiz-api-v1")))]
