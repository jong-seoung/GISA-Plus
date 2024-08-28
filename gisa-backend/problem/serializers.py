from problem.models import Problem, ProblemAnswer, ProblemCategory, ProblemPhoto
from rest_framework import serializers


class ProblemCategoryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProblemCategory
        fields = ["id", "name"]


class ProblemCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProblemCategory
        fields = "__all__"

    @staticmethod
    def get_optimized_queryset():
        return ProblemCategory.objects.all()


class ProblemAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProblemAnswer
        fields = "__all__"


class ProblemImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProblemPhoto
        fields = ["image"]


class ProblemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Problem
        fields = ["id", "title"]

    @staticmethod
    def get_optimized_queryset():
        return Problem.objects.all()


class ProblemListSerializer(serializers.ModelSerializer):
    answer = ProblemAnswerSerializer(source="problemanswer_set", many=True)
    image_list = ProblemImageSerializer(source="problemphoto_set", many=True)

    class Meta:
        model = Problem
        fields = ["id", "num", "title", "image_list", "answer", "correct_rate"]

    @staticmethod
    def get_optimized_queryset():
        return Problem.objects.all().order_by("num")


class ProblemDetailSerializer(serializers.ModelSerializer):
    answer = ProblemAnswerSerializer(source="problemanswer_set", many=True)
    image_list = ProblemImageSerializer(source="problemphoto_set", many=True)

    class Meta:
        model = Problem
        fields = ["id", "image_list", "title", "answer"]

    @staticmethod
    def get_optimized_queryset():
        return Problem.objects.all()
