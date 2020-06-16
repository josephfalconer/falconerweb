from django.views.generic.base import TemplateView


class MainTemplateView(TemplateView):
    template_name = 'main.html'
