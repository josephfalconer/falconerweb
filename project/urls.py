from django.conf.urls import url, include
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from project.common import views


api_urlpatterns = [
    url(r'^navigation/', views.NavigationListView.as_view()),
    url(r'^pages/', include('project.pages.urls'), name='pages'),
    url(r'^toolkit/', include('project.toolkit.urls'), name='toolkit'),
    url(r'^demos/', include('project.demos.urls_api'), name='demos'),
]

urlpatterns = [
  	url(r'^play/', include('project.demos.urls')),
    url(r'^admin/', admin.site.urls),
    url(r'^api/', include(api_urlpatterns)),
    url(r'^(?!^api|^play|^admin).*', views.MainTemplateView.as_view()),
]

urlpatterns += staticfiles_urlpatterns()
