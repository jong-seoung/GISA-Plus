from rest_framework import serializers
from restore.models import Restore, RestoreAnswer, RestoreCategory, RestorePhoto


# 카테고리 목록, 수정, 삭제
class RestoreCategoryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = RestoreCategory
        fields = "__all__"


class RestoreAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = RestoreAnswer
        fields = ["name", "num"]


class RestorePhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = RestorePhoto
        fields = ["id", "image"]


# 문제 목록 상세보기
class RestoreListSerializer(serializers.ModelSerializer):
    category = RestoreCategoryListSerializer()
    answer = RestoreAnswerSerializer(source="restoreanswer_set", many=True)
    image_list = RestorePhotoSerializer(source="restorephoto_set", many=True)

    class Meta:
        model = Restore
        fields = ["id", "num", "title", "content", "category", "answer", "image_list"]


# 문제 생성, 수정, 삭제
class RestoreSerializer(serializers.ModelSerializer):
    version = serializers.CharField(write_only=True)
    answer = RestoreAnswerSerializer(many=True, write_only=True)
    images = serializers.ListField(child=serializers.ImageField(), required=False)
    remove_image = serializers.ListField(required=False)

    class Meta:
        model = Restore
        fields = ["id", "num", "title", "content", "version", "answer", "images", "remove_image"]

    @staticmethod
    def get_optimized_queryset():
        return Restore.objects.all()

    def create(self, validated_data):
        category_data = validated_data.pop("version")
        answers_data = validated_data.pop("answer")
        images_data = validated_data.pop("images", [])

        category = RestoreCategory.objects.get(version=category_data)
        restore = Restore.objects.create(category=category, **validated_data)
        for answer_data in answers_data:
            RestoreAnswer.objects.create(restore=restore, **answer_data)
        for image_data in images_data:
            RestorePhoto.objects.create(restore=restore, image=image_data)
        return restore

    def update(self, instance, validated_data):
        print(validated_data)
        answers_data = validated_data.pop("answer")
        images_data = validated_data.pop("images", [])
        remove_image = validated_data.pop("remove_image", [])

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        RestoreAnswer.objects.filter(restore=instance).delete()
        for answer_data in answers_data:
            RestoreAnswer.objects.create(restore=instance, **answer_data)

        if remove_image:
            RestorePhoto.objects.filter(id__in=remove_image).delete()

        for image_data in images_data:
            RestorePhoto.objects.create(restore=instance, image=image_data)

        instance.save()
        return instance
