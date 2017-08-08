from django.contrib import admin

from .models import Region, ContentModule


class ContentModuleInline(admin.StackedInline):
	model = ContentModule
	min_num = 0
	max_num = 1
	extra = 0

class RegionAdmin(admin.ModelAdmin):
	inlines = [ContentModuleInline,]


admin.site.register(Region, RegionAdmin)

