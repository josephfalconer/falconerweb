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
	pages = list(Page.objects.all())
	skills = list(Skill.objects.all())
	projects = list(Project.objects.all())
	demos = list(Demo.objects.all())

	data = pages + skills + projects + demos
	serialized_data = serializers.serialize("json", data)

	return HttpResponse(serialized_data)

