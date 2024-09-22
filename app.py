from flask import Flask, request, jsonify, render_template, redirect, url_for
from api import *

app = Flask(__name__)
api.init_app(app)
app.app_context().push()



if __name__ == "__main__":
    app.run(debug=True)

