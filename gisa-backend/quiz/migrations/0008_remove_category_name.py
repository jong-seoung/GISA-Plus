# Generated by Django 5.0.7 on 2024-08-30 00:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('quiz', '0007_quizsave'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='category',
            name='name',
        ),
    ]
