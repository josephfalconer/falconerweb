from django.db import models


icons = (
	('logo', 'Logo'),
    ('skills', 'Skills'),
    ('projects', 'Projects'),
    ('demos', 'Demos'),
)

class Page(models.Model):
	created_at = models.DateTimeField(auto_now_add=True)
	title = models.CharField(max_length=255)
	description = models.TextField()
	icon = models.CharField(max_length=20, choices=icons)

	def __str__(self):
		return self.title