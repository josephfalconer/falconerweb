from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers

from .models import Demo


def data(request):
	data = Demo.objects.all()
	serialized_data = serializers.serialize("json", data)

	return HttpResponse(serialized_data)


def demo_view(request, demo_template):
	return render(request, 'demos/{}'.format(demo_template))