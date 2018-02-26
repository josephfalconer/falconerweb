import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "falconerweb.settings")
django.setup()


from core.models import NavigationLink
from demos.models import DemoLink
from regions.models import PrimaryRegion, SubRegion, ContentModule
from skills.models import SkillArea

def clean_field_name(name):
	cleaned_name = str(name)
	first_dot = cleaned_name.find('.')
	cleaned_name = cleaned_name[first_dot+1:]
	second_dot = cleaned_name.find('.')
	cleaned_name = cleaned_name[second_dot+1:]
	return cleaned_name

with open('backup.txt', 'w') as file:
	file.write('Primary Regions:\n\n')
	for r in PrimaryRegion.objects.all():
		for field in r._meta.fields:
			clean_name = clean_field_name(field)
			print(r.id)
			string = '{}: {}\n'.format(clean_name, r.fields(clean_name))
			file.write(string)

		file.write('\n')

		# f.write('order: ', r.order, '\n')
		# f.write('path_hash: ', r.path_hash, '\n')
		# f.write('icon: ', r.icon, '\n')
		# f.write('background: ', r.background, '\n')
		# f.write('text_colour: ', r.text_colour, '\n')
		# f.write('title: ', r.title, '\n')
		# f.write('display_title: ', r.display_title, '\n')
		# f.write('intro_text: ', r.intro_text, '\n')
		# f.write('center_content: ', r.center_content, '\n')
		# f.write('')