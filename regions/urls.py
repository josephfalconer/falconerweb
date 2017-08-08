from django.conf.urls import url

from . import views


urlpatterns = [
	url(r'^data-regions/', views.data_regions),
	url(r'^data-content-modules/', views.data_content_modules)
]
