from rest_framework import generics
from project.toolkit.models import Tool
from project.toolkit.serializers import ToolsListSerializer


class ToolsListView(generics.ListAPIView):
	queryset = Tool.objects.all()
	serializer_class = ToolsListSerializer
