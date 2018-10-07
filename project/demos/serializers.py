from rest_framework import serializers
from project.demos.models import Demo


class DemoListSerializer(serializers.ModelSerializer):

	class Meta:
		model = Demo
		fields = ('title', 'text', 'path')
