from rest_framework import serializers
from project.zones.models import ParentZone, ChildZone, ContentModule


class ContentModuleSerializer(serializers.ModelSerializer):

	class Meta:
		model = ContentModule
		fields = ('module_type', 'text')


class ZoneSerializer(serializers.ModelSerializer):

	class Meta:
		model = ParentZone
		fields = (
			'path_hash',
			'icon',
			'background',
			'text_colour',
			'title',
			'display_title',
			'intro_text',
			'center_content'
		)


class ChildZoneSerializer(ZoneSerializer):
	content_modules = ContentModuleSerializer(many=True)

	class Meta:
		model = ChildZone
		fields = ZoneSerializer.Meta.fields + ('content_modules',)


class ParentZonesListSerializer(ZoneSerializer):
	child_zones = ChildZoneSerializer(many=True)

	class Meta:
		fields = ZoneSerializer.Meta.fields + ('child_zones',)
	