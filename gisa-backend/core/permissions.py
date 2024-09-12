# 결제 기능 추가 시 주석 처리
from accounts.models import Manager
from rest_framework.permissions import SAFE_METHODS, BasePermission


class IsCategorySubscriber(BasePermission):
    def has_permission(self, request, view):
        # 인증되지 않은 사용자 -> 권한 없음
        if not request.user or not request.user.is_authenticated:
            return False

        # staff 사용자 -> 모든 권한 허용
        if Manager.objects.filter(user=request.user).exists():
            return True

        # 인증된 일반 사용자 -> SAFE_METHODS만 허용
        if request.method in SAFE_METHODS:
            return True

        # 일반 사용자는 SAFE_METHODS 이외에는 거부
        return False

        # 초기에는 결제 기능 x
        # 나중에 사용하려면 아래 코드를 활성화하세요.
        #     subscription = Subscription.objects.get(user=request.user, category=category, is_active=True)
        #     if subscription.expiry_date < timezone.now():
        #         subscription.is_active = False
        #         subscription.save()
        #         return False
