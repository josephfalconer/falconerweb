# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-08-24 16:12
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ChildRegion',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('order', models.IntegerField(default=0)),
                ('path_hash', models.CharField(blank=True, max_length=255)),
                ('icon', models.CharField(blank=True, choices=[(b'logo', b'Logo'), (b'skills', b'Spanner and Screwdriver'), (b'projects', b'@ symbol'), (b'demos', b'Laboratory Beaker')], max_length=200)),
                ('background', models.CharField(blank=True, choices=[(b'/static/backgrounds/asanoha-400px.png', b'Japanese Asanoha'), (b'/static/backgrounds/triangles.png', b'Triangles and Hexagons'), (b'/static/backgrounds/pyramids.png', b'Pyramids'), (b'/static/backgrounds/seigaiha.png', b'Seigaiha'), (b'/static/backgrounds/squares.png', b'Grey and White Squares')], max_length=200)),
                ('text_colour', models.CharField(blank=True, choices=[(b'light', b'Light Text'), (b'dark', b'Dark Text')], max_length=200)),
                ('title', models.CharField(max_length=20)),
                ('display_title', models.CharField(blank=True, max_length=255)),
                ('intro_text', models.TextField(blank=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='PrimaryRegion',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('order', models.IntegerField(default=0)),
                ('path_hash', models.CharField(blank=True, max_length=255)),
                ('icon', models.CharField(blank=True, choices=[(b'logo', b'Logo'), (b'skills', b'Spanner and Screwdriver'), (b'projects', b'@ symbol'), (b'demos', b'Laboratory Beaker')], max_length=200)),
                ('background', models.CharField(blank=True, choices=[(b'/static/backgrounds/asanoha-400px.png', b'Japanese Asanoha'), (b'/static/backgrounds/triangles.png', b'Triangles and Hexagons'), (b'/static/backgrounds/pyramids.png', b'Pyramids'), (b'/static/backgrounds/seigaiha.png', b'Seigaiha'), (b'/static/backgrounds/squares.png', b'Grey and White Squares')], max_length=200)),
                ('text_colour', models.CharField(blank=True, choices=[(b'light', b'Light Text'), (b'dark', b'Dark Text')], max_length=200)),
                ('title', models.CharField(max_length=20)),
                ('display_title', models.CharField(blank=True, max_length=255)),
                ('intro_text', models.TextField(blank=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.AddField(
            model_name='childregion',
            name='parent_region',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='regions.PrimaryRegion'),
        ),
    ]