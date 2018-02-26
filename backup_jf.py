import django
import os
import re

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "falconerweb.settings")
django.setup()

from core.models import NavigationLink
from demos.models import DemoLink
from regions.models import PrimaryRegion, SubRegion, ContentModule
from skills.models import SkillArea

def clean_name(name):
	cleaned_name = str(name)
	first_dot = cleaned_name.find('.')
	cleaned_name = cleaned_name[first_dot+1:]
	second_dot = cleaned_name.find('.')
	cleaned_name = cleaned_name[second_dot+1:]
	return cleaned_name

def build_string_from_fields(o):
	string = ''
	for f in o._meta.fields:
		cleaned_name = clean_name(f)
		string += '{}: {}\n'.format(cleaned_name.upper(), getattr(o, cleaned_name))
	return '{}\n'.format(string)

def build_dict_from_fields(o):
	formatted_o = {}
	for f in o._meta.fields:
		cleaned_name = clean_name(f)
		formatted_o[cleaned_name] = getattr(o, cleaned_name)
	return formatted_o

with open('backup.txt', 'w') as file:
	file.write('PrimaryRegions:\n\n')
	for o in PrimaryRegion.objects.all():
		file.write(build_string_from_fields(o))

	file.write('\nSubRegions:\n\n')
	for o in SubRegion.objects.all():
		file.write(build_string_from_fields(o))

	file.write('\nSkillAreas:\n\n')
	for o in SkillArea.objects.all():
		file.write(build_string_from_fields(o))

	file.write('\nDemoLinks:\n\n')
	for o in DemoLink.objects.all():
		file.write(build_string_from_fields(o))

	file.write('\nContentModules:\n\n')
	for o in ContentModule.objects.all():
		file.write(build_string_from_fields(o))

	file.write('\nNavigationLinks:\n\n')
	for o in NavigationLink.objects.all():
		file.write(build_string_from_fields(o))


# with open('backup-list.py', 'w') as file:
# 	backup_dict = {
# 		'primary_regions': [],
# 		'sub_regions': [],
# 		'content_modules': [],
# 		'skill_areas': [],
# 		'navigation_links': [],
# 		'demo_links': []
# 	}

# 	for o in PrimaryRegion.objects.all():
# 		formatted_o = build_dict_from_fields(o)
# 		backup_dict['primary_regions'].append(formatted_o)

# 	for o in SubRegion.objects.all():
# 		formatted_o = build_dict_from_fields(o)
# 		backup_dict['sub_regions'].append(formatted_o)

# 	for o in SkillArea.objects.all():
# 		formatted_o = build_dict_from_fields(o)
# 		backup_dict['skill_areas'].append(formatted_o)

# 	for o in DemoLink.objects.all():
# 		formatted_o = build_dict_from_fields(o)
# 		backup_dict['demo_links'].append(formatted_o)

# 	for o in ContentModule.objects.all():
# 		formatted_o = build_dict_from_fields(o)
# 		backup_dict['content_modules'].append(formatted_o)

# 	for o in NavigationLink.objects.all():
# 		formatted_o = build_dict_from_fields(o)
# 		backup_dict['navigation_links'].append(formatted_o)	

# 	stringed_dict = str(backup_dict)
# 	file.write('backup_dict = {}'.format(stringed_dict))