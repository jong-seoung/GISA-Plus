# Generated by Django 5.0.7 on 2024-09-05 07:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restore', '0005_restore_content_restoreanswer_num'),
    ]

    operations = [
        migrations.AlterField(
            model_name='restoreanswer',
            name='name',
            field=models.CharField(max_length=100),
        ),
    ]
