from quiz.models import Answer, Category, Photo, Quiz, Unit
from rest_framework import serializers


class CategoryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name"]


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class UnitSerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = Unit
        fields = ["name", "category"]


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = "__all__"


class QuizImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ["image"]


class QuizSerializer(serializers.ModelSerializer):
    unit = UnitSerializer()

    class Meta:
        model = Quiz
        fields = ["id", "unit", "title", "content"]

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
    unit = UnitSerializer()
    answer = AnswerSerializer(source="answer_set", many=True)
    image_list = QuizImageSerializer(source="photo_set", many=True)

    class Meta:
        model = Quiz
        fields = ["id", "unit", "image_list", "title", "content", "answer"]

    @staticmethod
    def get_optimized_queryset():
        return Quiz.objects.all().select_related("unit").prefetch_related("photo_set")
