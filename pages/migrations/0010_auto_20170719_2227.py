# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-07-19 21:27
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0009_auto_20170719_2219'),
    ]

    operations = [
        migrations.AlterField(
            model_name='page',
            name='body',
            field=models.TextField(blank=True),
        ),
    ]
