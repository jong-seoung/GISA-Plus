from django.contrib import admin

from .models import Problem, ProblemAnswer, ProblemCategory, ProblemPhoto


# ProblemCategory 모델 관리
@admin.register(ProblemCategory)
class ProblemCategoryAdmin(admin.ModelAdmin):
    pass


# Problem 모델 관리
@admin.register(Problem)
class ProblemAdmin(admin.ModelAdmin):
    pass


# ProblemAnswer 모델 관리
@admin.register(ProblemAnswer)
class ProblemAnswerAdmin(admin.ModelAdmin):
    pass


# ProblemPhoto 모델 관리
@admin.register(ProblemPhoto)
class ProblemPhotoAdmin(admin.ModelAdmin):
    pass
