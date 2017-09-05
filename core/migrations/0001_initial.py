# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-08-24 18:08
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='NavigationLink',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order', models.IntegerField(default=0)),
                ('icon', models.CharField(blank=True, choices=[(b'logo', b'Logo'), (b'skills', b'Spanner and Screwdriver'), (b'projects', b'@ symbol'), (b'demos', b'Laboratory Beaker')], max_length=200)),
                ('text', models.CharField(max_length=20)),
                ('linked_region', models.CharField(blank=True, choices=[('', 'Start'), ('skills', 'Skills'), ('demos', 'Demos'), ('projects', 'Projects')], default=None, max_length=50)),
            ],
            options={
                'ordering': ['order'],
            },
        ),
    ]
