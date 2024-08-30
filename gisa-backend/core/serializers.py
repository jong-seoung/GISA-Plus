from core.models import MainCategory
from rest_framework import serializers


class MainCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = MainCategory
        fields = ["id", "name"]
