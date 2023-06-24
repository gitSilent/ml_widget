from flask import Flask,jsonify
from flask_restful import Api, Resource
from flask_cors import CORS
import json

app = Flask(__name__)
api = Api()

CORS(app)

class Main(Resource):
    def get(self):
        # Открытие файла с содержимым в формате JSON
        with open('data.json') as f:
        # Преобразование содержимого файла в список объектов
            json_obj = json.load(f)

        return json.loads(json_obj)
    

api.add_resource(Main, '/main')
api.init_app(app)

if __name__ == "__main__":
    app.run(debug=True, port=3400, host='localhost')