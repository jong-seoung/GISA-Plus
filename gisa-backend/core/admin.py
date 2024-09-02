from django.contrib import admin

from .models import MainCategory


class MainCategoryAdmin(admin.ModelAdmin):
    pass


admin.site.register(MainCategory, MainCategoryAdmin)
