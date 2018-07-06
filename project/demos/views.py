from django.http import HttpResponse
import json
from project.demos.models import Demo


def format_demo_values(demo_values):
	return {
		'title': demo_values[0],
		'text': demo_values[1],
		'path': demo_values[2],
	}

def demos_list(request):
	data = [format_demo_values(demo) for demo in Demo.objects.all().values_list('title', 'text', 'path')]
	print(data)
	return HttpResponse(json.dumps(data))
