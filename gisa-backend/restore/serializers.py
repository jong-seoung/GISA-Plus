from rest_framework import serializers
from restore.models import Restore, RestoreAnswer, RestoreCategory, RestorePhoto


class RestoreCategoryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = RestoreCategory
        fields = "__all__"


class RestoreAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = RestoreAnswer
        fields = "__all__"


class RestorePhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = RestorePhoto
        fields = "__all__"


class RestoreListSerializer(serializers.ModelSerializer):
    category = RestoreCategoryListSerializer()
    answer = RestoreAnswerSerializer(source="restoreanswer_set", many=True)
    photo = RestorePhotoSerializer(source="restorephoto_set", many=True)

    class Meta:
        model = Restore
        fields = ["id", "num", "title", "category", "answer", "photo"]
