#!/usr/bin/python3
"""defines view functions to handle requests for biography data"""


from flask import Flask, jsonify, abort, request
from models import storage
from api.v1.views import app_views
from models.song import Song
from models.artiste import Artiste
from models.biography import biography
from better_profanity import profanity
app = Flask(__name__)


@app_views.route('/biography/<artiste_id>/<song_id>', methods=['GET'],
                 strict_slashes=False)
def get_biography(artiste_id=None, song_id=None):
    """Retrieves all biography objects for an artiste from a song and returns
    a list containing all of them"""
    artiste = storage.get('Artiste', artiste_id)
    if artiste is None:
        abort(404)
    song = storage.get('Song', song_id)
    if song is None:
        abort(404)
    biography_dict = storage.all(Biography)
    biography_list = []
    for biography in biography_dict.values():
        if biography.artiste_id == artiste_id and biography.song_id == song_id:
            biography_list.append(biography.to_dict())
    return jsonify(biography_list), 200


@app_views.route('/biography/<artiste_id>/<song_id>', methods=['POST'],
                 strict_slashes=False)
def post_biography(artiste_id=None, song_id=None):
    """Creates a biography of an artiste from a song"""
    print(artiste_id)
    print(song_id)
    artiste = storage.get('Artiste', artiste_id)
    if artiste is None:
        abort(404)
    song = storage.get('Song', song_id)
    if song is None:
        abort(404)
    result = request.get_json()
    if result is None:
        return jsonify({"error": "Not a JSON"}), 400
    if 'text' not in result:
        return jsonify({"error": "Missing text"}), 400
    if profanity.contains_profanity(result["text"]) is True:
        return jsonify({"error": "Profane"}), 400
    biography_obj = Biography(artiste_id=artiste_id, song_id=song_id)
    setattr(biography_obj, "text", result["text"])
    storage.new(biography_obj)
    storage.save()
    return jsonify(biography_obj.to_dict()), 201


@app_views.route('/biography/<biography_id>', methods=['PUT'],
                 strict_slashes=False)
def put_biography(biography_id=None):
    """Updates a biography object"""
    biography_obj = storage.get('Biography', bioraphy_id)
    if biography_obj is None:
        abort(404)
    result = request.get_json()
    if result is None:
        return jsonify({"error": "Not a JSON"}), 400
    if 'likes' not in result:
        return jsonify({"error": "Missing likes"}), 400
    setattr(biography_obj, "likes", result["likes"])
    storage.save()
    return jsonify(biography_obj.to_dict()), 200
