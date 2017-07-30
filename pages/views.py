from django.http import HttpResponse
from django.core import serializers

from .models import Page


def data(request):
	data = Page.objects.all()
	serialized_data = serializers.serialize("json", data)

	return HttpResponse(serialized_data)