from rest_framework import serializers
from project.pages.models import Page, ContentModule


class ContentModuleSerializer(serializers.ModelSerializer):

	class Meta:
		model = ContentModule
		fields = ('module_type', 'text')


class PageSerializer(serializers.ModelSerializer):
	content_modules = ContentModuleSerializer(many=True)
	
	class Meta:
		model = Page
		fields = (
			'slug',
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


class PageListSerializer(PageSerializer):
	child_pages = PageSerializer(many=True)
	
	class Meta:
		model = Page
		fields = PageSerializer.Meta.fields + ('child_pages', 'is_homepage')
