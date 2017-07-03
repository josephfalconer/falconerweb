from django.db import models


class Sheet(models.Model):
	created_at = models.DateTimeField(auto_now_add=True)
	title = models.CharField(max_length=255)

	def __str__(self):
		return self.title
