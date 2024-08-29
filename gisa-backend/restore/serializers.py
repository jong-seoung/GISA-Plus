from rest_framework import serializers
from restore.models import RestoreCategory


class RestoreCategoryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = RestoreCategory
        fields = "__all__"
