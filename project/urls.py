from django.urls import include, path, re_path
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from project.common import views


api_urlpatterns = [
    path('pages/', include('project.pages.urls'), name='pages'),
    path('toolkit/', include('project.toolkit.urls'), name='toolkit'),
    path('demos/', include('project.demos.urls_api'), name='demos'),
]

urlpatterns = [
    path('play/', include('project.demos.urls')),
    path('admin/', admin.site.urls),
    path('api/', include(api_urlpatterns)),
    re_path('^(/|$)(?!api|play|admin).*', views.MainTemplateView.as_view()),
]

urlpatterns += staticfiles_urlpatterns()
