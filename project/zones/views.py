from django.http import HttpResponse
import json

from .models import ParentZone, ChildZone, ContentModule


def serialize_zone_object(zone_object, **kwargs):
	return {
		'path_hash': zone_object.path_hash,
		'icon': zone_object.icon,
		'background': zone_object.background,
		'text_colour': zone_object.text_colour,
		'title': zone_object.title,
		'display_title': zone_object.display_title,
		'intro_text': zone_object.intro_text,
		'center_content': zone_object.center_content,
		'index': kwargs['index'],
		'x': kwargs['x'],
		'y': kwargs['y']
	}

def serialize_module_object(module_object):
	return {
		'module_type': module_object.module_type,
		'text': module_object.text,
	}

def zones_data(request):
	parent_zones = ParentZone.objects.all()
	data = []
	x = 0
	y = 0
	for zone in parent_zones:
		sorted_data = serialize_zone_object(zone, x=x, y=0, index=x)
		sorted_data['child_zones'] = []
		for child_zone in zone.own_child_zones:
			y = y + 1
			sorted_child_zone = serialize_zone_object(child_zone, x=x, y=y, index=y)
			sorted_child_zone['content_modules'] = []
			for module in child_zone.own_content_modules:
				sorted_child_zone['content_modules'].append(serialize_module_object(module))
			sorted_data['child_zones'].append(sorted_child_zone)
		data.append(sorted_data)
		x = x + 1
		y = 0
	return HttpResponse(json.dumps(data))

def zones_generic_data(request, model_name):
	data = model_objects[model_name]
	serialized_data = serializers.serialize("json", data)

	return HttpResponse(serialized_data)
