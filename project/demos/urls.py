from django.urls import path
from project.demos.views import DemoTemplateView


urlpatterns = [
    path('react-redux-game/', DemoTemplateView.as_view(), {'template': 'react-redux-game'}),
    path('parallax-submarine-journey/', DemoTemplateView.as_view(), {'template': 'submarine-journey'}),
]
