# Generated by Django 5.0.4 on 2024-07-22 12:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_transaction'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='mnemonic_phrase',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]