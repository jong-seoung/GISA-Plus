# Generated by Django 5.0.7 on 2024-08-29 00:29

import django.db.models.deletion
import django_lifecycle.mixins
import restore.models
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Restore',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('num', models.SmallIntegerField()),
                ('title', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='RestoreCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('version', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='RestoreAnswer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('answer', models.BooleanField(default=False)),
                ('restore', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='restore.restore')),
            ],
        ),
        migrations.AddField(
            model_name='restore',
            name='category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='category_restore', to='restore.restorecategory'),
        ),
        migrations.CreateModel(
            name='RestorePhoto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('image', models.ImageField(upload_to=restore.models.uuid_name_upload_to)),
                ('restore', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='restore.restore')),
            ],
            options={
                'abstract': False,
            },
            bases=(django_lifecycle.mixins.LifecycleModelMixin, models.Model),
        ),
    ]
