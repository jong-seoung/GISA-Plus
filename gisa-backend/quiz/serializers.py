from core.models import MainCategory
from quiz.models import Answer, Category, Photo, Quiz, QuizSave, Unit
from rest_framework import serializers


class UnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Unit
        fields = ["name", "category"]
        depth = 1


# 참고를 위한 Unit 모델 직렬화
class BasicUnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Unit
        fields = "__all__"


class CategorySerializer(serializers.ModelSerializer):
    unit = BasicUnitSerializer(many=True, source="category_unit", read_only=True)
    category_name = serializers.CharField(write_only=True)

    class Meta:
        model = Category
        fields = ["id", "version", "unit", "category_name"]

    @staticmethod
    def get_optimized_queryset():
        return Quiz.objects.all()

    def create(self, validated_data):
        category_name = validated_data.pop("category_name", "")
        validated_data["main_category"] = MainCategory.objects.get(name=category_name)
        return super().create(validated_data)


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ["id", "num", "name"]


class QuizImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ["id", "image"]


class QuizSerializer(serializers.ModelSerializer):
    categoryName = serializers.CharField(write_only=True)
    version = serializers.CharField(write_only=True)
    unit_name = serializers.CharField(write_only=True)
    answer = AnswerSerializer(many=True, write_only=True)
    images = serializers.ListField(child=serializers.ImageField(), required=False)
    remove_image = serializers.ListField(required=False)

    class Meta:
        model = Quiz
        fields = ["id", "title", "content", "categoryName", "unit_name", "version", "answer", "images", "remove_image"]

    @staticmethod
    def get_optimized_queryset():
        return Quiz.objects.all()

    def create(self, validated_data):
        answers_data = validated_data.pop("answer")
        images_data = validated_data.pop("images", [])
        unit_name = validated_data.pop("unit_name", "")
        version = validated_data.pop("version", "")
        main_category_name = validated_data.pop("categoryName", "")

        main_category = MainCategory.objects.get(name=main_category_name)
        category = Category.objects.get(main_category=main_category, version=version)
        unit = Unit.objects.get(category=category, name=unit_name)
        quiz = Quiz.objects.create(unit=unit, **validated_data)

        for answer_data in answers_data:
            Answer.objects.create(quiz=quiz, **answer_data)

        for image_data in images_data:
            Photo.objects.create(quiz=quiz, image=image_data)
        return quiz

    def update(self, instance, validated_data):
        answers_data = validated_data.pop("answer", "")
        images_data = validated_data.pop("images", [])
        remove_image = validated_data.pop("remove_image", [])

        unit_name = validated_data.pop("unit_name", "")
        version = validated_data.pop("version", "")
        main_category_name = validated_data.pop("categoryName", "")

        main_category = MainCategory.objects.get(name=main_category_name)
        category = Category.objects.get(main_category=main_category, version=version)
        unit = Unit.objects.get(category=category, name=unit_name)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.unit = unit

        Answer.objects.filter(quiz=instance).delete()
        for answer_data in answers_data:
            Answer.objects.create(quiz=instance, **answer_data)

        if remove_image:
            Photo.objects.filter(id__in=remove_image).delete()

        for image_data in images_data:
            Photo.objects.create(quiz=instance, image=image_data)

        instance.save()
        return instance


class QuizListSerializer(serializers.ModelSerializer):
    unit = UnitSerializer()
    image_list = QuizImageSerializer(source="photo_set", many=True)

    class Meta:
        model = Quiz
        fields = ["id", "unit", "image_list", "title", "content"]

    @staticmethod
    def get_optimized_queryset():
        return Quiz.objects.all()


class QuizDetailSerializer(serializers.ModelSerializer):
    unit = UnitSerializer()
    is_saved = serializers.SerializerMethodField()
    answer = AnswerSerializer(source="answer_set", many=True)
    image_list = QuizImageSerializer(source="photo_set", many=True)

    class Meta:
        model = Quiz
        fields = ["id", "unit", "image_list", "title", "content", "answer", "unit", "is_saved"]

    def get_is_saved(self, obj):
        user = self.context["request"].user
        return QuizSave.objects.filter(user=user, quiz_id=obj.id).exists()

    @staticmethod
    def get_optimized_queryset():
        return Quiz.objects.all().select_related("unit").prefetch_related("photo_set")


class QuizSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizSave
        fields = ["id", "saved_at"]
        read_only_fields = ["saved_at"]
