from django.http import HttpResponse
from django.core import serializers

from .models import Region, PrimaryRegion, ChildRegion, ContentModule


def data_regions(request):
	data = Region.objects.all()
	serialized_data = serializers.serialize("json", data)

	return HttpResponse(serialized_data)


def primary_regions(request):
	data = PrimaryRegion.objects.all()
	serialized_data = serializers.serialize("json", data)

	return HttpResponse(serialized_data)


def child_regions(request):
	data = ChildRegion.objects.all()
	serialized_data = serializers.serialize("json", data)

	return HttpResponse(serialized_data)


def data_content_modules(request):
	data = ContentModule.objects.all()
	serialized_data = serializers.serialize("json", data)

	return HttpResponse(serialized_data)