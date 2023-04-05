# Generated by Django 3.1.4 on 2023-04-05 21:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_auto_20230324_1452'),
    ]

    operations = [
        migrations.AlterField(
            model_name='document',
            name='file',
            field=models.FileField(upload_to='documents'),
        ),
        migrations.AlterField(
            model_name='document',
            name='form',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='documents', to='api.payment_activation'),
        ),
    ]