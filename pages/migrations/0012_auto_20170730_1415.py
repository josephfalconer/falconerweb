# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-07-30 13:15
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0011_auto_20170720_1905'),
    ]

    operations = [
        migrations.CreateModel(
            name='Module',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('order', models.IntegerField(default=0)),
                ('classification', models.CharField(choices=[('skills', 'Skills Acordion'), ('demos', 'Demos Menu'), ('projects', 'Projects Menu')], max_length=20)),
            ],
            options={
                'ordering': ['order'],
            },
        ),
        migrations.RemoveField(
            model_name='page',
            name='module',
        ),
        migrations.AddField(
            model_name='module',
            name='page',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pages.Page'),
        ),
    ]