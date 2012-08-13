import jinja2
import json
import os
import webapp2

from datetime import datetime, timedelta
from owl2 import word_set
from owl2lists import letter_lists

templates = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)))

class MainHandler(webapp2.RequestHandler):
  def get(self):
    template = templates.get_template('main.html')
    self.response.headers.add('X-UA-Compatible', 'IE=edge')
    self.response.out.write(template.render({
      'dev': os.environ["SERVER_SOFTWARE"].startswith('Development'),
    }))


class ApiCheckHandler(webapp2.RequestHandler):
  def get(self, word):
    resp = (word in word_set)
    self.response.content_type = 'application/json'
    self.response.cache_control.no_cache = None
    self.response.cache_control.public = True
    self.response.headers.add('Expires',
        (datetime.utcnow() + timedelta(days=(3650))).strftime("%a, %d %b %Y %H:%M:%S GMT"))
    self.response.out.write(json.dumps(resp))


class ApiListHandler(webapp2.RequestHandler):
  def get(self, letter):
    resp = list(letter_lists[letter])
    self.response.content_type = 'application/json'
    self.response.cache_control.no_cache = None
    self.response.cache_control.public = True
    self.response.headers.add('Expires',
        (datetime.utcnow() + timedelta(days=(3650))).strftime("%a, %d %b %Y %H:%M:%S GMT"))
    self.response.out.write(json.dumps(resp))


debug = os.environ.get('SERVER_SOFTWARE', '').startswith('Dev')
app = webapp2.WSGIApplication([
  webapp2.Route(r'/', MainHandler, name='main'),
  webapp2.Route(r'/api/check/<word:[a-zA-Z]{1,32}>', ApiCheckHandler, name='api_check'),
  webapp2.Route(r'/api/list/<letter:[a-zA-Z]>', ApiListHandler, name='api_list'),
], debug=debug)
