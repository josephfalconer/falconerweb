from django.shortcuts import get_object_or_404
from django.http import HttpResponse

from django.core import serializers

from .models import Sheet

def sheets(request):
	sheets = Sheet.objects.all()
	data = serializers.serialize("json", sheets)
	return HttpResponse(data)
