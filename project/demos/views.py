from rest_framework import generics
from django.shortcuts import render
from project.demos.serializers import DemoListSerializer
from project.demos.models import Demo


class DemoListView(generics.ListAPIView):
	queryset = Demo.objects.all()
	serializer_class = DemoListSerializer


def demo_template_view(request, demo_template):
	return render(request, 'demos/{}'.format(demo_template))
