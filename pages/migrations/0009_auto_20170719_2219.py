# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-07-19 21:19
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0008_auto_20170718_2256'),
    ]

    operations = [
        migrations.AddField(
            model_name='page',
            name='intro_text',
            field=models.TextField(default='skills'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='page',
            name='module',
            field=models.CharField(choices=[('skills', 'Skills Acordion'), ('demos', 'Demos Menu'), ('projects', 'Projects Menu')], default='skills', max_length=20),
            preserve_default=False,
        ),
    ]
