from flask import Flask, request, jsonify, render_template, redirect, url_for
from api import *
#import cors
from flask_restful import Api
from flask_cors import CORS


app = Flask(__name__)
api.init_app(app)
app.app_context().push()
CORS(app)


if __name__ == "__main__":
    app.run(debug=True)

