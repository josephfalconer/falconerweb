from django.http import HttpResponse
from django.core import serializers

from .models import PrimaryRegion, ChildRegion
# , ContentModule


def primary_regions(request):
	data = PrimaryRegion.objects.all()
	serialized_data = serializers.serialize("json", data)

	return HttpResponse(serialized_data)


def child_regions(request):
	data = ChildRegion.objects.all()
	serialized_data = serializers.serialize("json", data)

	return HttpResponse(serialized_data)


# def data_content_modules(request):
# 	data = ContentModule.objects.all()
# 	serialized_data = serializers.serialize("json", data)

# 	return HttpResponse(serialized_data)