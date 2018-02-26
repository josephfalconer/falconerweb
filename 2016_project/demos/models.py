from django.db import models

from core.models import ModuleIterable


class DemoLink(ModuleIterable):
	path = models.CharField(max_length=500)
	
