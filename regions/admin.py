from django.contrib import admin

from .models import Region, ContentModule


class ContentModuleInline(admin.StackedInline):
	model = ContentModule
	# ordering = ("order",)
	min_num = 0
	extra = 0

class RegionAdmin(admin.ModelAdmin):
	inlines = [ContentModuleInline,]


admin.site.register(Region, RegionAdmin)
