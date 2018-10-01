from django.conf.urls import url, include
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

from project.core import views
from project.demos.views import demos_list


api_urlpatters = [
    url(r'^navigation/', views.navigation),
    url(r'^pages/', include('project.pages.urls')),
    url(r'^toolkit/', include('project.toolkit.urls')),
    url(r'^demos/', demos_list),
]

urlpatterns = [
	url(r'^api/', include(api_urlpatters)),
    url(r'^admin/', admin.site.urls),
    url(r'^$', views.main),
]

urlpatterns += staticfiles_urlpatterns()
