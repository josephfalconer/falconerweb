from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers

from .models import DemoLink


def data(request):
	data = DemoLink.objects.all()
	serialized_data = serializers.serialize("json", data)

	return HttpResponse(serialized_data)


def demo_view(request, demo_template):
	return render(request, 'demos/{}'.format(demo_template))