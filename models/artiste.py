#!/usr/bin/python3
"""This module creates the Artiste class"""

import models
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String
from sqlalchemy.orm import relationship
from sqlalchemy import *


class Word(BaseModel, Base):
    """A class named Artiste
    Attributes:
    attr1(text): text of artiste
    attr2(songs): songs associated with artiste
    attr3(biography): biography associated with artiste
    """
    __tablename__ = 'artistes'
    text = Column(String(128), nullable=False)
    songs = relationship("Song", secondary='song_artiste', viewonly=False)
    biography = relationship("Biography", backref="artiste")
