from django.db import models


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
	icon = models.CharField(max_length=200)
	text = models.CharField(max_length=20)
	linked_page = models.CharField(max_length=50)

	def __str__(self):
		return self.text

	class Meta:
		ordering = ['order',]
		