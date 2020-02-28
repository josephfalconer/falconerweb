from django.contrib import admin
from django.utils.text import slugify
from project.pages.models import Page, ContentModule


def apply_custom_slug_or_title(page):
    page.slug = slugify(page.custom_slug) if page.custom_slug else slugify(page.title)


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
        'text_colour',
        'title',
        'display_title',
        'intro_text',
        'center_content',
        'parent_page',
        'is_homepage'
    )
    inlines = [ContentModuleInline,]

    def save_model(self, request, obj, form, change):
        if obj.is_homepage:
            existing_homepage = Page.objects.filter(is_homepage=True).first()
            if existing_homepage:
                apply_custom_slug_or_title(existing_homepage)
                existing_homepage.save()
            obj.slug = ''
        if 'custom_slug' in form.changed_data:
            apply_custom_slug_or_title(obj)
        elif 'title' in form.changed_data:
            obj.slug = slugify(obj.title)
        super().save_model(request, obj, form, change)


admin.site.register(Page, PageAdmin)
