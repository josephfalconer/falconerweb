# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-08-07 21:12
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0012_auto_20170803_0028'),
    ]

    operations = [
        migrations.AddField(
            model_name='navigationlink',
            name='icon',
            field=models.CharField(blank=True, choices=[('logo', 'Logo'), ('skills', 'Spanner and Screwdriver'), ('projects', '@ symbol'), ('demos', 'Laboratory Beaker')], max_length=200),
        ),
        migrations.AlterField(
            model_name='navigationlink',
            name='linked_region',
            field=models.CharField(blank=True, choices=[('start', 'Start'), ('skills', 'Skills'), ('demos', 'Demos'), ('projects', 'Projects'), ('about', 'About'), ('skills-read', 'Read skills'), ('demo-example', 'See demos'), ('live-projects', 'See projects')], default=None, max_length=50),
        ),
    ]