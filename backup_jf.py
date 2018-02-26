import os
import django

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
# 	# file.write('Primary Regions = [\n')
# 	# for r in PrimaryRegion.objects.all():
# 	# 	for field in r._meta.fields:
# 	# 		cleaned_name = clean_name(field)
# 	# 		string = '{}: {}\n'.format(cleaned_name.upper(), getattr(r, cleaned_name))
# 	# 		file.write(string)
# 	# 	file.write('\n')
# 	# file.write(']')
# 	list_test = [
# 		{
# 			'id': 1
# 		},
# 		{
# 			'id': 2
# 		}
# 	]
# 	file.write(str(list_test))