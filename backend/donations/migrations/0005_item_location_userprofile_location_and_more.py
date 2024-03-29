# Generated by Django 4.1.5 on 2023-06-03 10:35

import django.contrib.gis.db.models.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('donations', '0004_alter_userprofile_uid'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='location',
            field=django.contrib.gis.db.models.fields.PolygonField(blank=True, null=True, srid=4326),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='location',
            field=django.contrib.gis.db.models.fields.PolygonField(blank=True, null=True, srid=4326),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='searchRadius',
            field=models.IntegerField(default=15, verbose_name='Product search radius in km'),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='uid',
            field=models.CharField(default=1, max_length=30, primary_key=True, serialize=False, unique=True),
        ),
    ]
