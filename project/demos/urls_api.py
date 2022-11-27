from django.urls import path
from project.demos.views import DemoListView


urlpatterns = [
    path(r'', DemoListView.as_view(), name='demos-list')
]
