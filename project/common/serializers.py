from rest_framework import serializers
from project.common.models import NavigationLink
from project.pages.models import Page


class NavigationLinkPageSerializer(serializers.ModelSerializer):

	class Meta:
		model = Page
		fields = ('is_homepage', 'slug')


class NavigationSerializer(serializers.ModelSerializer):
	linked_page = NavigationLinkPageSerializer()

	class Meta:
		model = NavigationLink
		fields= ('text', 'linked_page', 'icon')
