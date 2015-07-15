"""
This module is ...
"""
# @TODO Write doc!
__author__ = 'Pierre-Olivier Quirion <pioliqui@gmail.com>'

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from spinaltoobox.models.models import User
import json

engine = create_engine("sqlite:////Users/willispinaud/Dropbox/Amerique/Montreal/python_spinal_web/spinaltoobox/da.sqlite")
Session = sessionmaker(bind=engine)
session = Session()

u = User(email="a@gmail.com", first_name="b", last_name="c", password="d")
session.add(u)
session.commit()