from django.contrib import admin
from project.zones.models import Zone, ContentModule


class ContentModuleInline(admin.StackedInline):
	model = ContentModule
	min_num = 0
	extra = 0


class ZoneAdmin(admin.ModelAdmin):
	inlines = [ContentModuleInline,]


admin.site.register(Zone, ZoneAdmin)
