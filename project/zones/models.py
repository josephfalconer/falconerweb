from django.db import models


ICONS = (
	('LOGO', 'Logo'),
    ('TOOLS', 'Spanner and Screwdriver'),
    ('PROJECTS', '@ symbol'),
    ('DEMOS', 'Laboratory Beaker'),
)

BACKGROUNDS = (
	('/static/backgrounds/asanoha-400px.png', 'Japanese Asanoha'),
    ('/static/backgrounds/triangles.png', 'Triangles and Hexagons'),
    ('/static/backgrounds/pyramids.png', 'Pyramids'),
    ('/static/backgrounds/seigaiha.png', 'Seigaiha'),
    ('/static/backgrounds/squares.png', 'Grey and White Squares'),
)

TEXT_COLOURS = (
	('light', 'Light Text'),
    ('dark', 'Dark Text'),
)

CONTENT_MODULE_TYPES = (
	('TEXT', 'Text'),
	('SKILLS_ACCORDION', 'Skills Accordion'),
	('DEMOS_MENU', 'Demos Menu')
)


class Zone(models.Model):
	created_at = models.DateTimeField(auto_now_add=True)
	order = models.IntegerField(default=0)
	path_hash = models.CharField(max_length=255, blank=True, unique=True)
	icon = models.CharField(max_length=200, choices=ICONS, blank=True)
	background = models.CharField(max_length=200, choices=BACKGROUNDS, blank=True)
	text_colour = models.CharField(max_length=200, choices=TEXT_COLOURS, default='dark')
	title = models.CharField(max_length=20)
	display_title = models.CharField(max_length=255, blank=True)
	intro_text = models.TextField(blank=True)
	center_content = models.BooleanField(default=False)

	class Meta:
		abstract = True
		ordering = ['order',]

	def __str__(self):
		return self.title


class ParentZone(Zone):
	pass


class ChildZone(Zone):
	parent_zone = models.ForeignKey(
		ParentZone, 
		on_delete=models.CASCADE,
		to_field='path_hash',
		related_name='child_zones'
	)
	

class ContentModule(models.Model):
	order = models.IntegerField(default=0)
	module_type = models.CharField(max_length=100, choices=CONTENT_MODULE_TYPES)
	zone = models.ForeignKey(
		ChildZone, 
		on_delete=models.CASCADE,
		to_field='path_hash'
	)
	text = models.TextField(blank=True)

	def __str__(self):
		return "#{} {} / {}".format(self.order, self.module_type, self.zone)

	class Meta:
		ordering = ['order',]