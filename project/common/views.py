from django.views.generic.base import TemplateView
from rest_framework import generics
from project.common.models import NavigationLink
from project.common.serializers import NavigationSerializer


class MainTemplateView(TemplateView):
    template_name = 'main.html'


class NavigationListView(generics.ListAPIView):
    serializer_class = NavigationSerializer
    queryset = NavigationLink.objects.all()
