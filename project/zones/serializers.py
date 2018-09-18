from rest_framework import serializers
from project.zones.models import Zone, ContentModule


class ContentModuleSerializer(serializers.ModelSerializer):

	class Meta:
		model = ContentModule
		fields = ('module_type', 'text')


class ZoneSerializer(serializers.ModelSerializer):
	content_modules = ContentModuleSerializer(many=True)
	is_child_zone = serializers.SerializerMethodField()
	
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
			'content_modules',
			'is_child_zone'
		)

	def get_is_child_zone(self, instance):
		return bool(instance.parent_zone)


class ZoneListSerializer(ZoneSerializer):
	child_zones = ZoneSerializer(many=True)
	
	class Meta:
		model = Zone
		fields = ZoneSerializer.Meta.fields + ('child_zones',)
	