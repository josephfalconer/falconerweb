from rest_framework import generics
from project.pages.serializers import PageListSerializer
from project.pages.models import Page


class PagesView(generics.ListAPIView):
	serializer_class = PageListSerializer

	def get_queryset(self):
		return Page.objects.filter(parent_page__isnull=True)
