from django.http import HttpResponse
import json

from .models import ParentZone, ChildZone, ContentModule


# do these 3 queries fire every time the view is invoked or just once?
model_objects = {
	"content_modules": ContentModule.objects.all()
}

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

def zones_data(request):
	parent_zones = ParentZone.objects.all()
	data = []
	x = 0
	y = 0
	for zone in parent_zones:
		sorted_data = serialize_zone_object(zone, x=x, y=0, index=x)
		sorted_data['child_zones'] = []
		child_zones = zone.child_zones.all()
		for child_zone in child_zones:
			y = y + 1
			sorted_data['child_zones'].append(serialize_zone_object(child_zone, x=x, y=y, index=y))
		data.append(sorted_data)
		x = x + 1
		y = 0
	return HttpResponse(json.dumps(data))

def zones_generic_data(request, model_name):
	data = model_objects[model_name]
	serialized_data = serializers.serialize("json", data)

	return HttpResponse(serialized_data)
