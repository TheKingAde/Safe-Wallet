# Generated by Django 5.0.4 on 2024-06-30 14:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='wallet_address',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]