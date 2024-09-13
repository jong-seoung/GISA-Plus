from datetime import datetime, timedelta

from core.models import MainCategory
from core.serializers import MainCategorySerializer
from payment.models import Subscription
from rest_framework.decorators import api_view, permission_classes, renderer_classes
from rest_framework.generics import ListAPIView
from rest_framework.renderers import JSONRenderer

# 권한 부여 - 추후 구독 기능 넣으면 삭제
from rest_framework.request import Request
from rest_framework.response import Response


class MainCategoryListView(ListAPIView):
    queryset = MainCategory.objects.all()
    serializer_class = MainCategorySerializer


# 임시 권한 부여
@api_view(["GET", "POST"])
@permission_classes([])
@renderer_classes([JSONRenderer])
def temporary_permission(request: Request) -> Response:
    user = request.user
    category_name = request.query_params.get("categoryName")
    category = MainCategory.objects.get(name=category_name)

    Subscription.objects.get_or_create(
        user=user, category=category, is_active=True, defaults={"expiry_date": datetime.now() + timedelta(days=90)}
    )

    return Response({"true": True})
