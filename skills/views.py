from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers

from .models import Skill


def data(request):
	data = Skill.objects.all()
	serialized_data = serializers.serialize("json", data)

	return HttpResponse(serialized_data)