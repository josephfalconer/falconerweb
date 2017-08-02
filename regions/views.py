from django.http import HttpResponse
from django.core import serializers

from .models import Region


def data(request):
	data = Region.objects.all()
	serialized_data = serializers.serialize("json", data)

	return HttpResponse(serialized_data)