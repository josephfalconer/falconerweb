from django.db import models
from django.utils.text import slugify
from project.common.constants import *


class Page(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    order = models.IntegerField(default=0)
    custom_slug = models.CharField(max_length=255, blank=True, null=True, unique=True)
    icon = models.CharField(max_length=200, choices=ICONS, blank=True)
    background = models.CharField(max_length=200, choices=BACKGROUNDS, blank=True)
    theme = models.CharField(max_length=200, choices=THEME_CHOICES, default=THEMES.LIGHT)
    title = models.CharField(max_length=20, unique=True)
    display_title = models.CharField(max_length=255, blank=True)
    intro_text = models.TextField(blank=True)
    center_content = models.BooleanField(default=False)
    parent_page = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, related_name='child_pages')
    is_homepage = models.BooleanField(default=False)

    class Meta:
        ordering = ['order',]

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        original_object = Page.objects.filter(pk=self.pk).first()
        was_homepage = original_object and original_object.is_homepage

        super(Page, self).save(*args, **kwargs)

        if not was_homepage and self.is_homepage:
            Page.objects.filter(is_homepage=True).exclude(pk=self.pk).update(is_homepage=False)

    @property
    def is_child_page(self):
        return bool(self.parent_page)

    @property
    def slug(self):
        if self.is_homepage:
            return ''
        return slugify(self.custom_slug) if self.custom_slug else slugify(self.title)


class ContentModule(models.Model):
    order = models.IntegerField(default=0)
    module_type = models.CharField(max_length=100, choices=CONTENT_MODULE_TYPES)
    page = models.ForeignKey(Page, on_delete=models.CASCADE, related_name='content_modules')
    text = models.TextField(blank=True)

    def __str__(self):
        return self.module_type

    class Meta:
        ordering = ['order',]
