from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def home():
  return render_template('home.html')

@app.route('/notes', methods=['POST'])
def create_note():
  print request.form
  return ''

if __name__ == '__main__':
  app.run(debug=True)
