from core.models import MainCategory
from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.ImageField(blank=True)


class Manager(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="managed_user")
    category = models.ForeignKey(MainCategory, on_delete=models.CASCADE, related_name="managed_categories")
