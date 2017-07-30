from django.contrib import admin

from .models import Page, Module


class ModuleInline(admin.StackedInline):
	model = Module
	min_num = 0
	max_num = 1
	extra = 0

class PageAdmin(admin.ModelAdmin):
	inlines = [ModuleInline,]


admin.site.register(Page, PageAdmin)