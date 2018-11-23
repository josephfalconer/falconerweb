from django.conf.urls import url
from project.demos.views import DemoListView


urlpatterns = [
    url(r'^$', DemoListView.as_view(), name='demos-list')
]
