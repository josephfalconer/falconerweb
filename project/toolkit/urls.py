from django.urls import path
from project.toolkit.views import ToolsListView


urlpatterns = [
    path('', ToolsListView.as_view(), name='list'),
]
