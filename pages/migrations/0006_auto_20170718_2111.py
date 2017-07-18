# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-07-18 20:11
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0005_auto_20170717_2053'),
    ]

    operations = [
        migrations.AddField(
            model_name='page',
            name='background',
            field=models.CharField(choices=[('asanoha-400px.png', 'Japanese Asanoha'), ('dark-triangles.png', 'Dark Triangles'), ('sayagata-400px', 'Japanese Sayagata'), ('seigaiha.png', 'Seigaiha')], default='Seigaiha', max_length=20),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='page',
            name='body',
            field=models.TextField(default='Body content'),
            preserve_default=False,
        ),
    ]
