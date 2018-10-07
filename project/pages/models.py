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
	('TOOLS_ACCORDION', 'Tools Accordion'),
	('DEMOS_MENU', 'Demos Menu')
)


class Page(models.Model):
	created_at = models.DateTimeField(auto_now_add=True)
	order = models.IntegerField(default=0)
	custom_slug = models.CharField(max_length=255, blank=True, null=True, unique=True)
	slug = models.CharField(max_length=255, unique=True)
	icon = models.CharField(max_length=200, choices=ICONS, blank=True)
	background = models.CharField(max_length=200, choices=BACKGROUNDS, blank=True)
	text_colour = models.CharField(max_length=200, choices=TEXT_COLOURS, default='dark')
	title = models.CharField(max_length=20)
	display_title = models.CharField(max_length=255, blank=True)
	intro_text = models.TextField(blank=True)
	center_content = models.BooleanField(default=False)
	parent_page = models.ForeignKey('self', null=True, blank=True, related_name='child_pages')

	class Meta:
		ordering = ['order',]

	def __str__(self):
		return self.title

	def save(self, *args, **kwargs):
		if self.custom_slug is not None and self.custom_slug.strip() == '':
			self.custom_slug = None
		super().save(*args, **kwargs)


class Homepage(models.Model):
	page = models.ForeignKey(Page, related_name='homepage')

	def save(self, *args, **kwargs):
		self.__class__.objects.exclude(pk=self.pk).delete()
		super().save()

	def __str__(self):
		return self.page.title

	class Meta:
		verbose_name_plural = 'Homepage'
	

class ContentModule(models.Model):
	order = models.IntegerField(default=0)
	module_type = models.CharField(max_length=100, choices=CONTENT_MODULE_TYPES)
	page = models.ForeignKey(Page, related_name='content_modules')
	text = models.TextField(blank=True)

	def __str__(self):
		return self.module_type

	class Meta:
		ordering = ['order',]
