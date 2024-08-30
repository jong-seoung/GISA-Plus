from django.urls import include, path
from quiz.views import QuizModelViewSet, QuizSaveViewSet
from rest_framework.routers import DefaultRouter

router_quiz = DefaultRouter()
router_quiz.register(prefix="post", viewset=QuizModelViewSet)
router_quiz.register(prefix="save", viewset=QuizSaveViewSet, basename="quiz-save")

urlpatterns = []

urlpatterns_quiz = []
urlpatterns_quiz += router_quiz.urls

urlpatterns += [path("api/", include((urlpatterns_quiz, "quiz-api-v1")))]
