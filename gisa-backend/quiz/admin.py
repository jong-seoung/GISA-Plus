from django.contrib import admin
from quiz.models import Answer, Category, Photo, Quiz, Unit


@admin.register(Category)
class Category(admin.ModelAdmin):
    pass


@admin.register(Unit)
class Unit(admin.ModelAdmin):
    pass


@admin.register(Answer)
class Answer(admin.ModelAdmin):
    pass


@admin.register(Quiz)
class Quiz(admin.ModelAdmin):
    pass


@admin.register(Photo)
class Photo(admin.ModelAdmin):
    pass
