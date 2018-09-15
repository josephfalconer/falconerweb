from rest_framework import generics
from project.zones.serializers import ParentZonesListSerializer
from project.zones.models import ParentZone


class ZonesListView(generics.ListAPIView):
	serializer_class = ParentZonesListSerializer
	queryset = ParentZone.objects.all()
