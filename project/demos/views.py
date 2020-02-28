from rest_framework import generics
from project.demos.serializers import DemoListSerializer
from project.demos.models import Demo
from django.views.generic.base import TemplateView


class DemoListView(generics.ListAPIView):
    queryset = Demo.objects.all()
    serializer_class = DemoListSerializer


class DemoTemplateView(TemplateView):

    def get_template_names(self):
        return ['demos/{}.html'.format(self.kwargs['template'])]
