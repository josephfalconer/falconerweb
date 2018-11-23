from rest_framework import serializers
from project.common.models import NavigationLink


class NavigationSerializer(serializers.ModelSerializer):

	class Meta:
		model = NavigationLink
		fields= ('text', 'linked_page', 'icon')
