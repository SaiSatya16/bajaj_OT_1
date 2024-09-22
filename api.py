from flask_restful import Resource, Api, reqparse, fields, marshal_with
from flask import make_response, jsonify
api=Api()


import base64
import magic
from datetime import datetime

# Replace these with your actual details
USER_ID = "Jonnalagadda_Sai_Satya_Narayana_16102003"
EMAIL = "jj1039@srmist.edu.in"
ROLL_NUMBER = "RA2111003011154"

class BFHL(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('data', type=list, required=True, help='Data list is required', location='json')
        self.reqparse.add_argument('file_b64', type=str, default='', location='json')
        super(BFHL, self).__init__()

    def post(self):
        args = self.reqparse.parse_args()
        data = args['data']
        file_b64 = args['file_b64']

        try:
            numbers = [item for item in data if isinstance(item, str) and item.isdigit()]
            alphabets = [item for item in data if isinstance(item, str) and item.isalpha()]
            highest_lowercase = max((char for char in alphabets if char.islower()), default='')

            file_valid = False
            file_mime_type = None
            file_size_kb = None

            if file_b64:
                try:
                    file_data = base64.b64decode(file_b64)
                    file_valid = True
                    file_size_kb = len(file_data) / 1024
                    
                    # Use python-magic to determine MIME type
                    mime = magic.Magic(mime=True)
                    file_mime_type = mime.from_buffer(file_data)
                except:
                    file_valid = False

            response = {
                "is_success": True,
                "user_id": USER_ID,
                "email": EMAIL,
                "roll_number": ROLL_NUMBER,
                "numbers": numbers,
                "alphabets": alphabets,
                "highest_lowercase_alphabet": [highest_lowercase] if highest_lowercase else [],
                "file_valid": file_valid
            }

            if file_valid:
                response["file_mime_type"] = file_mime_type
                response["file_size_kb"] = f"{file_size_kb:.2f}"

            return response, 200

        except Exception as e:
            return {"is_success": False, "error": str(e)}, 400

    def get(self):
        return {"operation_code": 1}, 200

api.add_resource(BFHL, '/bfhl')
