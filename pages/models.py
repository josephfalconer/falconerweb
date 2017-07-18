from django.db import models


icons = (
	('logo', 'Logo'),
    ('skills', 'Skills'),
    ('projects', 'Projects'),
    ('demos', 'Demos'),
)

backgrounds = (
	('asanoha-400px.png', 'Japanese Asanoha'),
    ('triangles.png', 'Triangles and Hexagons'),
    ('pyramids.png', 'Pyramids'),
    ('seigaiha.png', 'Seigaiha'),
)

class Page(models.Model):
	created_at = models.DateTimeField(auto_now_add=True)
	order = models.IntegerField(default=0)
	icon = models.CharField(max_length=20, choices=icons)
	background = models.CharField(max_length=20, choices=backgrounds)
	title = models.CharField(max_length=255)
	description = models.TextField()
	body = models.TextField()

	class Meta:
		ordering = ['order',]

	def __str__(self):
		return self.title