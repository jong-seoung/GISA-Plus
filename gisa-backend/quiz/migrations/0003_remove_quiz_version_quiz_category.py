# Generated by Django 5.0.7 on 2024-08-23 04:45

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quiz', '0002_alter_quiz_version_category_version_delete_version'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='quiz',
            name='version',
        ),
        migrations.AddField(
            model_name='quiz',
            name='category',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='category', to='quiz.category'),
            preserve_default=False,
        ),
    ]
