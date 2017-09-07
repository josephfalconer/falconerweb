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

text_colours = (
	('light', 'Light Text'),
    ('dark', 'Dark Text'),
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
	text_colour = models.CharField(max_length=200, choices=text_colours, blank=True)
	title = models.CharField(max_length=20, unique=True)
	display_title = models.CharField(max_length=255, blank=True)
	intro_text = models.TextField(blank=True)
	center_content = models.BooleanField(default=False)

	class Meta:
		abstract = True
		ordering = ['order',]

	def __str__(self):
		return self.title


class PrimaryRegion(Region):
	pass


class SubRegion(Region):
	parent_region = models.ForeignKey(
		PrimaryRegion, 
		on_delete=models.CASCADE,
		to_field='title'
	)
	

class ContentModule(models.Model):
	order = models.IntegerField(default=0)
	module_type = models.CharField(max_length=100, choices=content_module_types)
	region = models.ForeignKey(
		SubRegion, 
		on_delete=models.CASCADE,
		to_field='title'
	)

	def __str__(self):
		return "#{} {} / {}".format(self.order, self.module_type, self.region)

	class Meta:
		ordering = ['order',]