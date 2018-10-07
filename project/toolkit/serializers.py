from rest_framework import serializers
from project.toolkit.models import Tool


class ToolsListSerializer(serializers.ModelSerializer):

	class Meta:
		model = Tool
		fields = ('title', 'text')
