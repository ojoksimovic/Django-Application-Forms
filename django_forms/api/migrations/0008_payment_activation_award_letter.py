# Generated by Django 3.1.4 on 2023-06-25 23:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_payment_activation_admin_award_letter_notes'),
    ]

    operations = [
        migrations.AddField(
            model_name='payment_activation',
            name='award_letter',
            field=models.CharField(blank=True, max_length=1000, null=True),
        ),
    ]
