from django.db import models

from regions.models import Region





# navigation_paths = (
# 	('/skills/', 'Skills'),
# 	('/demos/', 'Demos'),
# 	('/projects/', 'Projects'),
# )


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
	regions = Region.objects.all()
	region_path_hashes = []

	for region in regions:
		region_path_hashes.append((region.path_hash, region.title))

	text = models.CharField(max_length=25)
	linked_region = models.CharField(max_length=50, choices=region_path_hashes, blank=True, default=None)

	def __str__(self):
		return self.text


	

		