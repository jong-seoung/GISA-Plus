import random

from problem.models import Problem, ProblemAnswer, ProblemCategory, ProblemPhoto
from rest_framework import serializers


# 카테고리 목록, 생성, 수정
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
        fields = ["name", "answer"]


class ProblemImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProblemPhoto
        fields = ["id", "image"]


class ProblemSerializer(serializers.ModelSerializer):
    version = serializers.CharField(write_only=True)
    answer = ProblemAnswerSerializer(many=True, write_only=True)
    images = serializers.ListField(child=serializers.ImageField(), required=False)
    remove_image = serializers.ListField(required=False)

    class Meta:
        model = Problem
        fields = ["id", "num", "title", "correct_rate", "version", "answer", "images", "remove_image"]

    @staticmethod
    def get_optimized_queryset():
        return Problem.objects.all()

    def create(self, validated_data):
        category_data = validated_data.pop("version")
        answers_data = validated_data.pop("answer")
        images_data = validated_data.pop("images", [])

        category = ProblemCategory.objects.get(version=category_data)
        problem = Problem.objects.create(category=category, **validated_data)
        for answer_data in answers_data:
            ProblemAnswer.objects.create(problem=problem, **answer_data)
        for image_data in images_data:
            ProblemPhoto.objects.create(problem=problem, image=image_data)
        return problem

    def update(self, instance, validated_data):
        answers_data = validated_data.pop("answer")
        images_data = validated_data.pop("images", [])
        remove_image = validated_data.pop("remove_image", [])

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        ProblemAnswer.objects.filter(problem=instance).delete()
        for answer_data in answers_data:
            ProblemAnswer.objects.create(problem=instance, **answer_data)

        if remove_image:
            ProblemPhoto.objects.filter(id__in=remove_image).delete()

        for image_data in images_data:
            ProblemPhoto.objects.create(problem=instance, image=image_data)

        instance.save()
        return instance


class ProblemListSerializer(serializers.ModelSerializer):
    answer = serializers.SerializerMethodField()
    image_list = ProblemImageSerializer(source="problemphoto_set", many=True)

    class Meta:
        model = Problem
        fields = ["id", "num", "title", "image_list", "answer", "correct_rate"]

    @staticmethod
    def get_optimized_queryset():
        return Problem.objects.all().order_by("num")

    def get_answer(self, obj):
        answers = list(obj.problemanswer_set.all())
        random.shuffle(answers)
        return ProblemAnswerSerializer(answers, many=True).data
