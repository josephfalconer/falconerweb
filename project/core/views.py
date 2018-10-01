from django.shortcuts import render
from django.http import HttpResponse
import json

from .models import NavigationLink


def serialize_navigation_link(navigation_link):
	return {
		'text': navigation_link.text,
		'linked_page': navigation_link.linked_page,
		'icon': navigation_link.icon
	}

def main(request):
	return render(request, "main.html")

def navigation(request):
	data = [serialize_navigation_link(link) for link in NavigationLink.objects.all()]
	return HttpResponse(json.dumps(data))