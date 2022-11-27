from django.urls import path

from project.pages.views import PagesView


urlpatterns = [
    path('', PagesView.as_view(), name='pages'),
]
