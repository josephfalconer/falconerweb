# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2018-10-01 17:19
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
                ('icon', models.CharField(max_length=200)),
                ('text', models.CharField(max_length=20)),
                ('linked_page', models.CharField(max_length=50)),
            ],
            options={
                'ordering': ['order'],
            },
        ),
    ]
