from django.contrib import admin
from django import forms
from project.core.models import NavigationLink
from project.zones.models import Zone


class NavigationLinkForm(forms.ModelForm):

	ICON_CHOICES = (
		('LOGO', 'Logo'),
	    ('TOOLS', 'Spanner and Screwdriver'),
	    ('PROJECTS', '@ symbol'),
	    ('DEMOS', 'Laboratory Beaker'),
	)
	LINKED_ZONE_CHOICES = list(Zone.objects.values_list('path_hash', 'title'))

	class Meta:
		model = NavigationLink
		fields = '__all__'

	icon = forms.ChoiceField(choices=ICON_CHOICES)
	linked_zone = forms.ChoiceField(choices=LINKED_ZONE_CHOICES)


@admin.register(NavigationLink)
class NavigationLinkAdmin(admin.ModelAdmin):
	form = NavigationLinkForm