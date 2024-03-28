from flask import Flask, request, jsonify
from PIL import Image
import numpy as np
import io
from flask_cors import CORS
import pickle
import torch
from torchvision import transforms,datasets

dataset_path = r'C:\Users\aasmi\Downloads\archive (7)\CUB_200_2011\CUB_200_2011\images'

def get_classes(data_dir):
    all_data = datasets.ImageFolder(data_dir)
    return all_data.classes

classes = get_classes(dataset_path)

def process_image(im):
    def apply_test_transforms(inp):
        out = transforms.functional.resize(inp, [224,224])
        out = transforms.functional.to_tensor(out)
        out = transforms.functional.normalize(out, [0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
        return out

    def formatText(string):
        string = string[4:]
        string = string.replace("-", " ")
        return string

    im_as_tensor = apply_test_transforms(im)
    minibatch = torch.stack([im_as_tensor])
    if torch.cuda.is_available():
        minibatch = minibatch.cuda()

    with open(r'C:\Users\aasmi\Desktop\bird\model.pkl', 'rb') as model_file:

        model = pickle.load(model_file)
    
        pred = model(minibatch)
        _, classnum = torch.max(pred, 1)
        
    return formatText(classes[classnum])

app = Flask(__name__)
CORS(app, resources={r"/process_image": {"origins": "http://localhost:3000"}})  # Allow requests from http://localhost:3000                                        
@app.route('/process_image', methods=['POST'])
def process_image_route():

    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'})

    image_file = request.files['image']
    
    allowed_extensions = {'png', 'jpg', 'jpeg'}
    if '.' not in image_file.filename or image_file.filename.rsplit('.', 1)[1].lower() not in allowed_extensions:
        return jsonify({'error': 'Invalid image file format'})

   
    image = Image.open(image_file)
    # image_array = np.array(image)
    result = process_image(image)

    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True)
