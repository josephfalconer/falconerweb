from django.contrib import admin
from django.utils.text import slugify
from project.pages.models import Page, Homepage, ContentModule


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
		'parent_page'
	)
	inlines = [ContentModuleInline,]

	def save_model(self, request, obj, form, change):
		if 'custom_slug' in form.changed_data:
			if obj.custom_slug:
				obj.slug = slugify(obj.custom_slug)
			else:
				obj.slug = slugify(obj.title)
		elif 'title' in form.changed_data:
			obj.slug = slugify(obj.title)
		super().save_model(request, obj, form, change)


admin.site.register(Page, PageAdmin)
admin.site.register(Homepage)
