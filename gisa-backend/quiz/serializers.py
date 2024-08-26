from quiz.models import Category, Photo, Quiz
from rest_framework import serializers


class CategoryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name"]


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class QuizImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ["image"]


class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = ["id", "title", "content"]

    @staticmethod
    def get_optimized_queryset():
        return Quiz.objects.all()


class QuizListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = ["id", "title", "content"]

    @staticmethod
    def get_optimized_queryset():
        return Quiz.objects.all()


class QuizDetailSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    image_list = QuizImageSerializer(source="photo_set", many=True)

    class Meta:
        model = Quiz
        fields = ["id", "category", "image_list", "title", "content"]

    @staticmethod
    def get_optimized_queryset():
        return Quiz.objects.all().select_related("category").prefetch_related("photo_set")
