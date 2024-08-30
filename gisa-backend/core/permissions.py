from core.models import MainCategory
from rest_framework.exceptions import PermissionDenied


def check_object_permissions(self, category_name):
    obj = MainCategory.objects.get(name=category_name)

    if not self.request.user.has_perm("view_maincategory", obj):
        raise PermissionDenied("결제 페이지로 이동")
