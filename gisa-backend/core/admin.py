from django.contrib import admin
from guardian.admin import GuardedModelAdmin

from .models import MainCategory


class MainCategoryAdmin(GuardedModelAdmin):
    pass


admin.site.register(MainCategory, MainCategoryAdmin)
