from django.contrib import admin
from project.pages.models import Page, ContentModule


class ContentModuleInline(admin.StackedInline):
    model = ContentModule
    min_num = 0
    extra = 0


class PageAdmin(admin.ModelAdmin):
    fields = (
        'order',
        'custom_slug',
        'icon',
        'background',
        'theme',
        'title',
        'display_title',
        'intro_text',
        'center_content',
        'parent_page',
        'is_homepage'
    )
    inlines = [ContentModuleInline,]


admin.site.register(Page, PageAdmin)
