# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-09-07 19:49
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('regions', '0007_auto_20170906_2112'),
    ]

    operations = [
        migrations.AddField(
            model_name='primaryregion',
            name='center_content',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='subregion',
            name='center_content',
            field=models.BooleanField(default=False),
        ),
    ]