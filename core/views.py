from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers

from pages.models import Page
from skills.models import Skill
from projects.models import Project
from demos.models import Demo


def main(request):
	return render(request, "main.html")

def data(request):
	data = Page.objects.all()
	serialized_data = serializers.serialize("json", data)

	return HttpResponse(serialized_data)

