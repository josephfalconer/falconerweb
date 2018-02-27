from django.contrib import admin

from .models import ChildZone, ContentModule, ParentZone


class ContentModuleInline(admin.StackedInline):
	model = ContentModule
	min_num = 0
	extra = 0

class ChildZoneAdmin(admin.ModelAdmin):
	inlines = [ContentModuleInline,]


admin.site.register(ParentZone)
admin.site.register(ChildZone, ChildZoneAdmin)

