from django.conf.urls import url

from project.pages.views import PagesView


urlpatterns = [
    url(r'^$', PagesView.as_view(), name='pages'),
]
