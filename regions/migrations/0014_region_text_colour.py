# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-08-21 20:33
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('regions', '0013_auto_20170809_1959'),
    ]

    operations = [
        migrations.AddField(
            model_name='region',
            name='text_colour',
            field=models.CharField(blank=True, choices=[('light', 'Light Text'), ('dark', 'Dark Text')], max_length=200),
        ),
    ]
