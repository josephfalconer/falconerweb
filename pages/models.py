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

module_types = (
	('skills', 'Skills Acordion'),
    ('demos', 'Demos Menu'),
    ('projects', 'Projects Menu'),
)

class Page(models.Model):
	created_at = models.DateTimeField(auto_now_add=True)
	order = models.IntegerField(default=0)
	icon = models.CharField(max_length=20, choices=icons)
	background = models.CharField(max_length=20, choices=backgrounds)
	description = models.TextField()
	title = models.CharField(max_length=255)
	intro_text = models.TextField()
	body = models.TextField(blank=True)
	module_name = models.CharField(max_length=20, choices=module_types, blank=True)

	class Meta:
		ordering = ['order',]

	def __str__(self):
		return self.title



class Module(models.Model):
	created_at = models.DateTimeField(auto_now_add=True)
	classification = models.CharField(max_length=20, choices=module_types)
	page = models.ForeignKey(Page)
	