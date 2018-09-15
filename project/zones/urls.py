from django.conf.urls import url

from project.zones.views import ZonesListView


urlpatterns = [
	url(r'^$', ZonesListView.as_view(), name='list'),
]
