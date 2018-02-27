# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2018-02-26 22:15
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Tool',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('order', models.IntegerField(default=0)),
                ('title', models.CharField(max_length=255)),
                ('text', models.TextField()),
            ],
            options={
                'ordering': ['order'],
                'abstract': False,
            },
        ),
    ]