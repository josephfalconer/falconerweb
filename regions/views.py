from django.http import HttpResponse
from django.core import serializers

from .models import PrimaryRegion, SubRegion
# , ContentModule


def primary_regions(request):
	data = PrimaryRegion.objects.all()
	serialized_data = serializers.serialize("json", data)

	return HttpResponse(serialized_data)


def sub_regions(request):
	data = SubRegion.objects.all()
	serialized_data = serializers.serialize("json", data)

	return HttpResponse(serialized_data)


# def data_content_modules(request):
# 	data = ContentModule.objects.all()
# 	serialized_data = serializers.serialize("json", data)

# 	return HttpResponse(serialized_data)