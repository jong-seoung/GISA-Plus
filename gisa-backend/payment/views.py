from datetime import datetime, timedelta

from core.models import MainCategory
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Payment, Subscription


@api_view(["POST"])
def purchase_subscription(request):
    user = request.user
    print(request.data)
    imp_uid = request.data.get("imp_uid")
    merchant_uid = request.data.get("merchant_uid")
    amount = request.data.get("amount")
    categoryName = request.data.get("name")
    status = request.data.get("status")
    paid_at = request.data.get("paid_at")

    try:
        category = MainCategory.objects.get(name=categoryName)

        # 구독 생성 또는 갱신
        subscription, created = Subscription.objects.get_or_create(
            user=user, category=category, is_active=True, defaults={"expiry_date": datetime.now() + timedelta(days=90)}
        )

        if not created:
            # 구독이 이미 존재하면 만료일을 연장
            subscription.expiry_date += timedelta(days=90)
            subscription.save()

        # 결제 내역 저장
        Payment.objects.create(
            user=user,
            category=category,
            imp_uid=imp_uid,
            merchant_uid=merchant_uid,
            amount=amount,
            paid_at=datetime.fromtimestamp(paid_at),
            status=status,
            subscription=subscription,
        )
        return Response({"detail": "Subscription and payment saved successfully"}, status=201)

    except MainCategory.DoesNotExist:
        return Response({"error": "Category not found"}, status=404)
    except Exception as e:
        return Response({"error": "An error occurred", "message": str(e)}, status=500)
