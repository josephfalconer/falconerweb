from django.conf.urls import url

from . import views

urlpatterns = [
	url(r'^react-redux-game', views.demo_view, {'demo_template': 'react-redux-game.html'}),
	url(r'^$', views.data)
]