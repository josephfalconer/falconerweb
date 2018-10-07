from django.conf.urls import url, include
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

from project.core import views as core_views
from project.demos import views as demo_views


api_urlpatterns = [
    url(r'^navigation/', core_views.navigation),
    url(r'^pages/', include('project.pages.urls'), name='pages'),
    url(r'^toolkit/', include('project.toolkit.urls'), name='toolkit'),
    url(r'^demos/', demo_views.DemoListView.as_view(), name='demos'),
]

urlpatterns = [
	url(r'^demos/', include('project.demos.urls')),
	url(r'^api/', include(api_urlpatterns)),
    url(r'^admin/', admin.site.urls),
    url(r'^$', core_views.main),
]

urlpatterns += staticfiles_urlpatterns()
