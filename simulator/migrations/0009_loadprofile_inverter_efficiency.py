# Generated by Django 3.2.4 on 2021-07-20 15:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('simulator', '0008_auto_20210719_2247'),
    ]

    operations = [
        migrations.AddField(
            model_name='loadprofile',
            name='inverter_efficiency',
            field=models.FloatField(blank=True, default=0.9, null=True),
        ),
    ]
