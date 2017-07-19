from django.db import models

from core.models import ModuleIterable


class Project(ModuleIterable):
	url = models.CharField(max_length=50)
	featured_image = models.CharField(max_length=50, blank=True)

