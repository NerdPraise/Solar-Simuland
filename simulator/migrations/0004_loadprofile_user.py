# Generated by Django 3.2.4 on 2021-07-05 21:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('simulator', '0003_alter_loadprofile_total_demand'),
    ]

    operations = [
        migrations.AddField(
            model_name='loadprofile',
            name='user',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='simulator.user'),
            preserve_default=False,
        ),
    ]
