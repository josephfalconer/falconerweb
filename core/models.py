from django.db import models

from regions.models import PrimaryRegion


regions = PrimaryRegion.objects.all()
region_path_hashes = []

for region in regions:
	region_path_hashes.append((region.path_hash, region.title))


icons = (
	('logo', 'Logo'),
    ('skills', 'Spanner and Screwdriver'),
    ('projects', '@ symbol'),
    ('demos', 'Laboratory Beaker'),
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
	order = models.IntegerField(default=0)
	icon = models.CharField(max_length=200, choices=icons, blank=True)
	text = models.CharField(max_length=20)
	linked_region = models.CharField(max_length=50, choices=region_path_hashes, blank=True, default=None)

	def __str__(self):
		return self.text

	class Meta:
		ordering = ['order',]


	

		