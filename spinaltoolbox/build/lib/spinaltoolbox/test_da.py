"""
This module is ...
"""
# @TODO Write doc!
__author__ = 'Pierre-Olivier Quirion <pioliqui@gmail.com>'

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from .models import RegisteredTool
import json

engine = create_engine("sqlite:////home/pquirion/travail/neuropoly/python_spinal_web/spinaltoolbox/db.sqlite")
Session = sessionmaker(bind=engine)
session = Session()

a = {'toto': 'lala'}
aj = json.dumps(a)
rt = RegisteredTool(name='tool1', options=a)

session.add(rt)