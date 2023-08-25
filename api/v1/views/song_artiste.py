#!/usr/bin/python3
"""defines view functions to handle requests for song_artiste data"""


from flask import Flask, jsonify, abort, request
from models import storage
from api.v1.views import app_views
from models.song import Song
app = Flask(__name__)


@app_views.route('/songs/<song_id>/artistes', methods=['GET'],
                 strict_slashes=False)
def get_artistes_for_song(song_id):
    """Retrieves artiste of a song and returns artiste name"""
    song = storage.get("Song", song_id)
    if song is None:
        return jsonify({}), 404
    artiste_list = []
    for artiste in song.artistes:
        artiste_list.append(word.to_dict())
    return jsonify(word_list), 200
