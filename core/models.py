from django.db import models


class ModuleIterable(models.Model):
	created_at = models.DateTimeField(auto_now_add=True)
	order = models.IntegerField(default=0)
	title = models.CharField(max_length=255)
	text = models.TextField()

	def __str__(self):
		return self.title

	class Meta:
		abstract = True
		ordering = ['order',]

		