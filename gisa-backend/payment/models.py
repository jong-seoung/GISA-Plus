from datetime import timedelta

from core.models import MainCategory
from django.conf import settings
from django.db import models


class Subscription(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    category = models.ForeignKey(MainCategory, on_delete=models.CASCADE, related_name="subscriptions")
    purchased_at = models.DateTimeField(auto_now_add=True)
    expiry_date = models.DateTimeField()  # 만료일
    is_active = models.BooleanField(default=True)

    def save(self, *args, **kwargs):
        if not self.expiry_date:
            self.expiry_date = self.purchased_at + timedelta(days=90)  # 3개월 후
        super().save(*args, **kwargs)


class Payment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    category = models.ForeignKey(MainCategory, on_delete=models.CASCADE, related_name="payments")
    imp_uid = models.CharField(max_length=255)  # 아임포트의 결제 고유 ID
    merchant_uid = models.CharField(max_length=255)
    amount = models.IntegerField()
    paid_at = models.DateTimeField()
    status = models.CharField(max_length=20)  # 결제 상태 (paid, failed 등)
    subscription = models.ForeignKey(Subscription, on_delete=models.CASCADE, related_name="payments")
