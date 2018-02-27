from django.db import models

from project.zones.models import ParentZone


parent_zones = ParentZone.objects.all()
parent_zones_hashes = []

for zone in parent_zones:
	parent_zones_hashes.append((zone.path_hash, zone.title))


ICONS = (
	('LOGO', 'Logo'),
    ('TOOLS', 'Spanner and Screwdriver'),
    ('PROJECTS', '@ symbol'),
    ('DEMOS', 'Laboratory Beaker'),
)

class GenericItem(models.Model):
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
	order = models.IntegerField(default=0)
	icon = models.CharField(max_length=200, choices=ICONS, blank=True)
	text = models.CharField(max_length=20)
	linked_zone = models.CharField(max_length=50, choices=parent_zones_hashes, blank=True, default=None)

	def __str__(self):
		return self.text

	class Meta:
		ordering = ['order',]
