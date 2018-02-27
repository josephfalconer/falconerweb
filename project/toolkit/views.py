from django.http import HttpResponse
from django.core import serializers

from .models import Tool


def data(request):
	data = Tool.objects.all()
	serialized_data = serializers.serialize("json", data)

	return HttpResponse(serialized_data)
