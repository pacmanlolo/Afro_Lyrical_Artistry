#!/usr/bin/python3
"""creates a flask Blueprint and imports all views which use Blueprint"""

from flask import Blueprint
app_views = Blueprint('app_views', __name__, url_prefix='/api/v1')
from api.v1.views.songs import *
from api.v1.views.song_artiste import *
from api.v1.views.biography import *
from api.v1.views.artiste import *
from api.v1.views.suggestions import *
from api.v1.views.artistes_api import *
