from django.db import models


navigation_paths = (
	('/skills/', 'Skills'),
	('/demos/', 'Demos'),
	('/projects/', 'Projects'),
)


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


class NavigationLink(models.Model):
	text = models.CharField(max_length=25)
	target = models.CharField(max_length=50, choices=navigation_paths)

	def __str__(self):
		return self.text

		