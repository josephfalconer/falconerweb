# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2018-11-23 22:15
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('common', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='navigationlink',
            name='icon',
            field=models.CharField(blank=True, choices=[('LOGO', 'Logo'), ('TOOLS', 'Spanner and Screwdriver'), ('PROJECTS', '@ symbol'), ('DEMOS', 'Laboratory Beaker')], max_length=200),
        ),
        migrations.AlterField(
            model_name='navigationlink',
            name='linked_page',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pages.Page'),
        ),
    ]
