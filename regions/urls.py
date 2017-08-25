from django.conf.urls import url

from . import views


urlpatterns = [
	url(r'^primary-regions/', views.primary_regions),
	url(r'^sub-regions/', views.sub_regions),
	# url(r'^content-modules/', views.data_content_modules)
]
