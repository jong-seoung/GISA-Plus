from typing import Optional, Type

from django.db.models import QuerySet
from rest_framework.serializers import Serializer


class ActionBasedViewSetMixin:
    queryset_map = {}
    serializer_class_map = {}

    def get_queryset(self) -> QuerySet:
        qs: Optional[QuerySet] = self.queryset_map.get(self.action, None)
        if qs is not None:
            # 인스턴스 변수로 할당
            #   - 부모의 get_queryset 메서드의 self.queryset 코드에서는
            #     queryset 인스턴스 변수가 없으면 클래스 변수 queryset을 참조
            self.queryset = qs
        return super().get_queryset()

    def get_serializer_class(self) -> Type[Serializer]:
        cls: Optional[Type[Serializer]] = self.serializer_class_map.get(self.action, None)
        if cls is not None:
            # 인스턴스 변수로 할당
            #   - 부모의 get_serializer_class 메서드의 self.serializer_class 코드에서는
            #     serializer_class 인스턴스 변수가 없으면 클래스 변수 serializer_class을 참조
            self.serializer_class = cls
        return super().get_serializer_class()
