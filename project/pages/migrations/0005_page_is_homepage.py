# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2018-11-23 23:04
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0004_auto_20181123_2236'),
    ]

    operations = [
        migrations.AddField(
            model_name='page',
            name='is_homepage',
            field=models.BooleanField(default=False),
        ),
    ]