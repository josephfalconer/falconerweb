# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2018-02-27 00:42
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('zones', '0003_auto_20180226_2319'),
    ]

    operations = [
        migrations.AlterField(
            model_name='childzone',
            name='parent_zone',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='child_zones', to='zones.ParentZone', to_field='path_hash'),
        ),
    ]
