# Generated by Django 3.1.4 on 2023-02-23 18:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_auto_20210625_1856'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='external_id',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AddField(
            model_name='customuser',
            name='external_type',
            field=models.CharField(blank=True, max_length=20),
        ),
    ]
