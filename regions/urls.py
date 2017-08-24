from django.conf.urls import url

from . import views


urlpatterns = [
	url(r'^primary-regions/', views.primary_regions),
	url(r'^child-regions/', views.child_regions),
	# url(r'^content-modules/', views.data_content_modules)
]
