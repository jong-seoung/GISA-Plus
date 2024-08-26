from django.contrib import admin
from quiz.models import Category, Quiz


@admin.register(Category)
class Category(admin.ModelAdmin):
    pass


@admin.register(Quiz)
class Quiz(admin.ModelAdmin):
    pass
