from django.db import models


icons = (
	('logo', 'Logo'),
    ('skills', 'Spanner and Screwdriver'),
    ('projects', '@ symbol'),
    ('demos', 'Laboratory Beaker'),
)

backgrounds = (
	('/static/backgrounds/asanoha-400px.png', 'Japanese Asanoha'),
    ('/static/backgrounds/triangles.png', 'Triangles and Hexagons'),
    ('/static/backgrounds/pyramids.png', 'Pyramids'),
    ('/static/backgrounds/seigaiha.png', 'Seigaiha'),
    ('/static/backgrounds/squares.png', 'Grey and White Squares'),
)

content_module_types = (
	('text', 'Text'),
	('skills_accordion', 'Skills Accordion'),
	('demos_menu', 'Demos Menu')
)

class Region(models.Model):
	created_at = models.DateTimeField(auto_now_add=True)
	order = models.IntegerField(default=0)
	path_hash = models.CharField(max_length=255, blank=True)
	icon = models.CharField(max_length=200, choices=icons, blank=True)
	background = models.CharField(max_length=200, choices=backgrounds, blank=True)
	title = models.CharField(max_length=20)
	long_title = models.CharField(max_length=255, blank=True)
	intro_text = models.TextField(blank=True)

	def __str__(self):
		return self.title


class ContentModule(models.Model):
	module_type = models.CharField(max_length=100, choices=content_module_types)
	region = models.ForeignKey(Region)