# Generated by Django 5.0.7 on 2024-09-09 00:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quiz', '0009_category_main_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='answer',
            name='name',
            field=models.CharField(max_length=100),
        ),
    ]
