from core.models import MainCategory
from django.contrib import admin


@admin.register(MainCategory)
class adminMainCategory(admin.ModelAdmin):
    pass
