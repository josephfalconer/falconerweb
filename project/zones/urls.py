from django.conf.urls import url

from . import views


urlpatterns = [
	url(r'^all-zones/', views.zones_data),
]
