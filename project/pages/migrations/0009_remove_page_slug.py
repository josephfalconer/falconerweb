# -*- coding: utf-8 -*-
# Generated by Django 1.11.29 on 2020-03-13 13:47
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0008_auto_20190218_2233'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='page',
            name='slug',
        ),
    ]
