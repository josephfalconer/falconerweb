# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-08-07 19:38
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('regions', '0009_region_short_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='region',
            name='short_name',
        ),
        migrations.AddField(
            model_name='region',
            name='long_title',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AlterField(
            model_name='region',
            name='title',
            field=models.CharField(max_length=20),
        ),
    ]
