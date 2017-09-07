from django.http import HttpResponse
from django.core import serializers

from .models import SkillArea


def data(request):
	data = SkillArea.objects.all()
	serialized_data = serializers.serialize("json", data)

	return HttpResponse(serialized_data)