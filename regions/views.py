from django.http import HttpResponse
from django.core import serializers

from .models import PrimaryRegion, SubRegion, ContentModule


# do these 3 queries fire every time the view is invoked or just once?
data_objects = {
	"primary_regions": PrimaryRegion.objects.all(),
	"sub_regions": SubRegion.objects.all(),
	"content_modules": ContentModule.objects.all()
}

def regions_data(request, model_name):
	data = data_objects[model_name]
	serialized_data = serializers.serialize("json", data)

	return HttpResponse(serialized_data)
