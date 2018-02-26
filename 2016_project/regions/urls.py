from django.conf.urls import url

from . import views


urlpatterns = [
	url(r'^primary-regions/', views.regions_data, {'model_name': 'primary_regions'}),
	url(r'^sub-regions/', views.regions_data, {'model_name': 'sub_regions'}),
	url(r'^content-modules/', views.regions_data, {'model_name': 'content_modules'})
]
