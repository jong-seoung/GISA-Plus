# Generated by Django 5.0.7 on 2024-09-02 04:21

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_manager'),
        ('core', '0003_remove_maincategory_managers'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='manager',
            name='category',
        ),
        migrations.RemoveField(
            model_name='manager',
            name='user',
        ),
        migrations.AddField(
            model_name='manager',
            name='category',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='managed_categories', to='core.maincategory'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='manager',
            name='user',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='managed_user', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]
