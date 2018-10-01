from django.contrib import admin
from project.pages.models import Page, ContentModule


class ContentModuleInline(admin.StackedInline):
	model = ContentModule
	min_num = 0
	extra = 0


class PageAdmin(admin.ModelAdmin):
	inlines = [ContentModuleInline,]


admin.site.register(Page, PageAdmin)
