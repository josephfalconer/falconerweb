ICONS = (
    ('LOGO', 'Logo'),
    ('TOOLS', 'Spanner and Screwdriver'),
    ('PROJECTS', '@ symbol'),
    ('DEMOS', 'Laboratory Beaker'),
)

BACKGROUNDS = (
    ('/static/images/asanoha-400px.png', 'Japanese Asanoha'),
    ('/static/images/triangles.png', 'Triangles and Hexagons'),
    ('/static/images/pyramids.png', 'Pyramids'),
    ('/static/images/seigaiha.png', 'Seigaiha'),
    ('/static/images/squares.png', 'Grey and White Squares'),
)

class THEMES:
    LIGHT = 'LIGHT'
    DARK = 'DARK'


THEME_CHOICES = (
    (THEMES.LIGHT, 'Light'),
    (THEMES.DARK, 'Dark'),
)

CONTENT_MODULE_TYPES = (
    ('TEXT', 'Text'),
    ('TOOLS_ACCORDION', 'Tools Accordion'),
    ('DEMOS_MENU', 'Demos Menu')
)
