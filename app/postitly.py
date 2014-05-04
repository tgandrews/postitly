import os
from sqlite3 import dbapi2 as sqlite3
from flask import Flask, request, session, g, redirect, url_for, abort, \
     render_template, flash

app = Flask(__name__)

app.config.update(dict(
  DATABASE=os.path.join(app.root_path, 'postitly.db'),
))

def connect_db():
  rv = sqlite3.connect(app.config['DATABASE'])
  rv.row_factory = sqlite3.Row
  return rv

def get_db():
  if not hasattr(g, 'sqlite_db'):
    g.sqlite_db = connect_db()
  return g.sqlite_db

@app.teardown_appcontext
def close_db(error):
  if hasattr(g, 'sqlite_db'):
    g.sqlite_db.close()

@app.route('/')
def home():
  return desktop(1)

@app.route('/desktop/<int:desktop_id>', methods=['GET'])
def desktop(desktop_id):
  db = get_db()
  cursor = db.execute('select id, text, type, left, top from notes where desktop = ?', [desktop_id])
  notes = cursor.fetchall()
  print notes
  return render_template('home.html', notes=notes)

@app.route('/notes', methods=['POST'])
def create_note():
  print 'Create note'
  print request.form
  form = request.form
  db = get_db()
  db.execute('insert into notes (id, text, type, left, top, desktop) values (?, ?, ?, ?, ?, ?)',
    [form['id'], form['text'], form['type'], form['left'], form['top'], form['desktop']])
  db.commit()
  return ''

@app.route('/notes/<int:note_id>', methods=['PUT'])
def update_note(note_id):
  print 'Update note: ' + str(note_id)
  print request.form

  form = request.form
  db = get_db()
  db.execute('update notes set text = ?, type = ?, left = ?, top = ? where id = ?',
    [form['text'], form['type'], form['left'], form['top'], note_id])
  db.commit()
  return ''

if __name__ == '__main__':
  app.run(debug=True)
