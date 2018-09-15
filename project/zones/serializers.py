from rest_framework import serializers
from project.zones.models import Zone, ContentModule


class ContentModuleSerializer(serializers.ModelSerializer):

	class Meta:
		model = ContentModule
		fields = ('module_type', 'text')


class ZoneSerializer(serializers.ModelSerializer):
	content_modules = ContentModuleSerializer(many=True)
	
	class Meta:
		model = Zone
		fields = (
			'path_hash',
			'icon',
			'background',
			'text_colour',
			'title',
			'display_title',
			'intro_text',
			'center_content',
			'content_modules'
		)


class ZoneListSerializer(ZoneSerializer):
	child_zones = ZoneSerializer(many=True)
	
	class Meta:
		model = Zone
		fields = ZoneSerializer.Meta.fields + ('child_zones',)
	