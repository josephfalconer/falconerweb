from django.db import models

from project.common.models import GenericItem


class Tool(GenericItem):
    internal_link_path = models.CharField(max_length=255, blank=True, null=True)
    internal_link_text = models.CharField(max_length=255, blank=True, null=True)
