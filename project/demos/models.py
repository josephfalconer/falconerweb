from django.db import models
from project.common.models import GenericItem


class Demo(GenericItem):
    path = models.CharField(max_length=255)
