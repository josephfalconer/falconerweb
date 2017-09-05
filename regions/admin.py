from django.contrib import admin

from .models import PrimaryRegion, SubRegion, ContentModule


class ContentModuleInline(admin.StackedInline):
	model = ContentModule
	# ordering = ("order",)
	min_num = 0
	extra = 0

class SubRegionAdmin(admin.ModelAdmin):
	inlines = [ContentModuleInline,]


admin.site.register(PrimaryRegion)
admin.site.register(SubRegion, SubRegionAdmin)

