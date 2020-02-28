from django.conf.urls import url
from project.demos.views import DemoTemplateView


urlpatterns = [
    url(r'^react-redux-game/$', DemoTemplateView.as_view(), {'template': 'react-redux-game'}),
    url(r'^parallax-submarine-journey/$', DemoTemplateView.as_view(), {'template': 'submarine-journey'}),
]
