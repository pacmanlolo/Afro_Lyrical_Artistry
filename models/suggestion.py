#!/usr/bin/python3
"""This module creates the Suggestion class"""

import models
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String
from sqlalchemy import *


class Suggestion(BaseModel, Base):
     """A class named Suggestion
     Attributes:
     attr1(suggested_artist): artist the user suggested
     attr2(suggested_song): song the user suggested
     attr3(name): name of user that submitted suggestion
     attr4(email): email of user that submitted suggestion
     """
     __tablename__ = 'suggestions'
     suggested_artist = Column(String(120), nullable=False)
     suggested_song = Column(String(120), nullable=False)
     name = Column(String(120), nullable=False)
     email = Column(String(120), nullable=False)
