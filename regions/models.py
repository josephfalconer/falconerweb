from django.db import models


class Region(models.Model):
	created_at = models.DateTimeField(auto_now_add=True)
	order = models.IntegerField(default=0)
	title = models.CharField(max_length=255)
	path_hash = models.CharField(max_length=255, blank=True)

	def __str__(self):
		return self.title
