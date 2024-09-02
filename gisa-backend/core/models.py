from accounts.models import User
from django.db import models


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class MainCategory(models.Model):
    name = models.CharField(max_length=100, unique=True)
    managers = models.ManyToManyField(User, related_name="managed_categories")

    def __str__(self):
        return self.name
