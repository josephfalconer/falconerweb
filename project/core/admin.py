from django.contrib import admin
from django import forms
from project.core.models import NavigationLink
from project.pages.models import Page


class NavigationLinkForm(forms.ModelForm):

	ICON_CHOICES = (
		('LOGO', 'Logo'),
	    ('TOOLS', 'Spanner and Screwdriver'),
	    ('PROJECTS', '@ symbol'),
	    ('DEMOS', 'Laboratory Beaker'),
	)
	LINKED_PAGE_CHOICES = list(Page.objects.values_list('path_hash', 'title'))

	class Meta:
		model = NavigationLink
		fields = '__all__'

	icon = forms.ChoiceField(choices=ICON_CHOICES)
	linked_page = forms.ChoiceField(choices=LINKED_PAGE_CHOICES)


@admin.register(NavigationLink)
class NavigationLinkAdmin(admin.ModelAdmin):
	form = NavigationLinkForm