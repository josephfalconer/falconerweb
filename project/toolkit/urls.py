from django.conf.urls import url
from project.toolkit.views import ToolsListView


urlpatterns = [
	url(r'^$', ToolsListView.as_view(), name='list'),
]
