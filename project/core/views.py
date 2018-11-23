from django.views.generic.base import TemplateView
from rest_framework import generics
from project.core.models import NavigationLink
from project.core.serializers import NavigationSerializer


class MainTemplateView(TemplateView):
	template_name = 'main.html'


class NavigationListView(generics.ListAPIView):
	serializer_class = NavigationSerializer
	queryset = NavigationLink.objects.all()
