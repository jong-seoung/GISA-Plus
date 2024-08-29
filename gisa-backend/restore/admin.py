from django.contrib import admin
from restore.models import Restore, RestoreAnswer, RestoreCategory, RestorePhoto


@admin.register(RestoreCategory)
class RestoreCategoeyAdmin(admin.ModelAdmin):
    pass


@admin.register(Restore)
class RestoreAdmin(admin.ModelAdmin):
    pass


@admin.register(RestoreAnswer)
class RestoreAnswerAdmin(admin.ModelAdmin):
    pass


@admin.register(RestorePhoto)
class RestorePhotoAdmin(admin.ModelAdmin):
    pass
