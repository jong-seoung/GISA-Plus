# Generated by Django 5.0.7 on 2024-08-28 04:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('problem', '0002_alter_problem_category'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='problem',
            name='num',
        ),
        migrations.AddField(
            model_name='problemanswer',
            name='num',
            field=models.SmallIntegerField(default=1),
            preserve_default=False,
        ),
    ]
