from django.conf.urls import url

from . import views


urlpatterns = [
	url(r'^all-zones/', views.zones_data),
	# url(r'^child-zones/', views.zones_data, {'model_name': 'child_zone'}),
	url(r'^content-modules/', views.zones_generic_data, {'model_name': 'content_modules'})
]
