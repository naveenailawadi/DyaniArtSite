#!/usr/bin/python3.6
import os
import sys
import logging
logging.basicConfig(stream=sys.stderr)
sys.path.insert(0, "/var/www/EntreDevelopersLabSite/")

from flaskapp import app as application
