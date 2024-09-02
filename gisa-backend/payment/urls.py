from django.urls import path
from payment.views import purchase_subscription

urlpatterns = [path("api/purchase-subscription/", purchase_subscription)]
