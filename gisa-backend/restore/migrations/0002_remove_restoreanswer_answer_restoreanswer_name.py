# Generated by Django 5.0.7 on 2024-08-29 01:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restore', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='restoreanswer',
            name='answer',
        ),
        migrations.AddField(
            model_name='restoreanswer',
            name='name',
            field=models.CharField(default=1, max_length=100, unique=True),
            preserve_default=False,
        ),
    ]
