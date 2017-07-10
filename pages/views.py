from django.shortcuts import get_object_or_404
from django.http import HttpResponse

from django.core import serializers

from .models import Page

def pages(request):
	pages = Page.objects.all()
	data = serializers.serialize("json", pages)
	return HttpResponse(data)
