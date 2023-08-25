#!/usr/bin/python3
"""This module creates the biography class"""

import models
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relationship
from sqlalchemy import *


class biography(BaseModel, Base):
    """A class named biography
    Attributes:
    attr1(text): biography text
    attr2(song_id): song id associated with biography
    attr3(artiste_id): artiste id associated with biography
    """
    __tablename__ = 'biography'
    text = Column(String(600), nullable=False)
    song_id = Column(String(60), ForeignKey('songs.id'), nullable=False)
    word_id = Column(String(60), ForeignKey('words.id'), nullable=False)
    likes = Column(Integer, default=0, nullable=False)
