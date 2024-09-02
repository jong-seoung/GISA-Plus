from datetime import datetime, timedelta

from core.models import MainCategory
from core.serializers import MainCategorySerializer
from payment.models import Subscription

# 권한 부여 - 추후 구독 기능 넣으면 삭제
from rest_framework.decorators import api_view
from rest_framework.generics import ListAPIView


class MainCategoryListView(ListAPIView):
    queryset = MainCategory.objects.all()
    serializer_class = MainCategorySerializer


@api_view(["POST"])
def temporary_permission(request):
    user = request.user
    category = MainCategory.objects.get(name="정보처리기사")

    Subscription.objects.get_or_create(
        user=user, category=category, is_active=True, defaults={"expiry_date": datetime.now() + timedelta(days=90)}
    )

    return True
