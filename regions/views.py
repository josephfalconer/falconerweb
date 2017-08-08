from django.http import HttpResponse
from django.core import serializers

from .models import Region, ContentModule


def data_regions(request):
	data = Region.objects.all()
	serialized_data = serializers.serialize("json", data)

	return HttpResponse(serialized_data)


def data_content_modules(request):
	data = ContentModule.objects.all()
	serialized_data = serializers.serialize("json", data)

	return HttpResponse(serialized_data)