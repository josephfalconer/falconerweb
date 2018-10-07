from django.conf.urls import url
from project.demos.views import DemoListView, demo_template_view


urlpatterns = [
	url(r'^react-redux-game/$', demo_template_view, {'demo_template': 'react-redux-game.html'}),
	url(r'^parallax-submarine-journey/$', demo_template_view, {'demo_template': 'submarine-journey.html'}),
]
