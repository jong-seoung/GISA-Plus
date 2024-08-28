from django.contrib import admin

from .models import Problem, ProblemAnswer, ProblemCategory, ProblemPhoto


# ProblemCategory 모델 관리
@admin.register(ProblemCategory)
class ProblemCategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "version")
    search_fields = ("name",)


# Problem 모델 관리
@admin.register(Problem)
class ProblemAdmin(admin.ModelAdmin):
    list_display = ("title", "num", "correct_rate", "category")
    search_fields = ("title",)
    list_filter = ("category",)
    ordering = ("num",)


# ProblemAnswer 모델 관리
@admin.register(ProblemAnswer)
class ProblemAnswerAdmin(admin.ModelAdmin):
    list_display = ("name", "answer", "problem")
    search_fields = ("name",)
    list_filter = ("problem",)


# ProblemPhoto 모델 관리
@admin.register(ProblemPhoto)
class ProblemPhotoAdmin(admin.ModelAdmin):
    list_display = ("problem", "image")
    search_fields = ("problem__title",)
