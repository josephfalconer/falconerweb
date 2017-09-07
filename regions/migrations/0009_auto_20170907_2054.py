# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-09-07 19:54
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('regions', '0008_auto_20170907_2049'),
    ]

    operations = [
        migrations.AlterField(
            model_name='primaryregion',
            name='text_colour',
            field=models.CharField(choices=[('light', 'Light Text'), ('dark', 'Dark Text')], default='dark', max_length=200),
        ),
        migrations.AlterField(
            model_name='subregion',
            name='text_colour',
            field=models.CharField(choices=[('light', 'Light Text'), ('dark', 'Dark Text')], default='dark', max_length=200),
        ),
    ]
