from rest_framework import generics
from project.zones.serializers import ZoneListSerializer
from project.zones.models import Zone


class ZonesListView(generics.ListAPIView):
	serializer_class = ZoneListSerializer

	def get_queryset(self):
		return Zone.objects.filter(parent_zone__isnull=True)
