# 결제 기능 추가 시 주석 처리

from accounts.models import Manager
from rest_framework.permissions import SAFE_METHODS, BasePermission


class IsCategorySubscriber(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True

        if Manager.objects.filter(user=request.user).exists():
            return True

        return False

        # 초기에는 결제 기능 x
        # 나중에 사용하려면 아래 코드를 활성화하세요.
        # try:
        #     return Manager.objects.filter(user=request.user, category=category).exists()
        # except Manager.DoesNotExist:
        #     subscription = Subscription.objects.get(user=request.user, category=category, is_active=True)
        #     if subscription.expiry_date < timezone.now():
        #         subscription.is_active = False
        #         subscription.save()
        #         return False
