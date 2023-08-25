v1/views/artistes.py
#!/usr/bin/python3
"""defines view functions to handle requests for songs data"""


from flask import Flask, jsonify, abort, request
from models import storage
from api.v1.views import app_views
from models.artiste import Artiste
app = Flask(__name__)


@app_views.route('/artistes/<text>', methods=['GET'], strict_slashes=False)
def get_artiste_id(text):
    """Retrieves artiste_id based on artiste"""
    artistes_dict = storage.all(Artiste)
    for artiste in artistes_dict.values():
        if artiste.text == text:
            return jsonify(artiste.id), 200
    abort(404)
