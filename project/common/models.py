from django.db import models
from project.pages.models import Page, ICONS


class GenericItem(models.Model):
	created_at = models.DateTimeField(auto_now_add=True)
	order = models.IntegerField(default=0)
	title = models.CharField(max_length=255)
	text = models.TextField()

	def __str__(self):
		return self.title

	class Meta:
		abstract = True
		ordering = ['order',]


class NavigationLink(models.Model):
	order = models.IntegerField(default=0)
	icon = models.CharField(max_length=200, choices=ICONS, blank=True)
	text = models.CharField(max_length=20)
	linked_page = models.ForeignKey(Page)

	def __str__(self):
		return self.text

	class Meta:
		ordering = ['order',]
		