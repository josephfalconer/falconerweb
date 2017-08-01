from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers

from .models import NavigationLink


def main(request):
	return render(request, "main.html")

def navigation(request):
	data = NavigationLink.objects.all()
	serialized_data = serializers.serialize("json", data)

	return HttpResponse(serialized_data)

