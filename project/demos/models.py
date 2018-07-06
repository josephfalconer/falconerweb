from django.db import models
from project.core.models import GenericItem


class Demo(GenericItem):
	path = models.CharField(max_length=255)
