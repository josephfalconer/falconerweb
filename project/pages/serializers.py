from rest_framework import serializers
from project.pages.models import Page, ContentModule


class ContentModuleSerializer(serializers.ModelSerializer):

	class Meta:
		model = ContentModule
		fields = ('module_type', 'text')


class PageSerializer(serializers.ModelSerializer):
	content_modules = ContentModuleSerializer(many=True)
	is_child_page = serializers.SerializerMethodField()
	
	class Meta:
		model = Page
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
			'is_child_page'
		)

	def get_is_child_page(self, instance):
		return bool(instance.parent_page)


class PageListSerializer(PageSerializer):
	child_pages = PageSerializer(many=True)
	
	class Meta:
		model = Page
		fields = PageSerializer.Meta.fields + ('child_pages',)
	