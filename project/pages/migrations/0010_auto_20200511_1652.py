# Generated by Django 2.1.7 on 2020-05-11 15:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0009_remove_page_slug'),
    ]

    operations = [
        migrations.AlterField(
            model_name='page',
            name='title',
            field=models.CharField(max_length=20, unique=True),
        ),
    ]
