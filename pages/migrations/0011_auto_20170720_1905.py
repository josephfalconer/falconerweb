# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-07-20 18:05
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0010_auto_20170719_2227'),
    ]

    operations = [
        migrations.AlterField(
            model_name='page',
            name='module',
            field=models.CharField(blank=True, choices=[('skills', 'Skills Acordion'), ('demos', 'Demos Menu'), ('projects', 'Projects Menu')], max_length=20),
        ),
    ]