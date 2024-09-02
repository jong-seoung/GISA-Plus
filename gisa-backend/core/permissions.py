from core.models import MainCategory
from payment.models import Subscription
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import BasePermission


def check_object_permissions(self, category_name):
    obj = MainCategory.objects.get(name=category_name)

    if not self.request.user.has_perm("view_maincategory", obj):
        raise PermissionDenied("결제 페이지로 이동")


class IsCategorySubscriber(BasePermission):
    def has_permission(self, request, view):
        category_id = request.query_params.get("category_id")
        category = MainCategory.objects.get(id=category_id)
        try:
            subscription = Subscription.objects.get(user=request.user, category=category, is_active=True)
            # 초기에는 결제 기능 x
            # if subscription.expiry_date < timezone.now():
            #     subscription.is_active = False
            #     subscription.save()
            #     return False
            if subscription.exist():
                return True
            return True
        except Subscription.DoesNotExist:
            return False
