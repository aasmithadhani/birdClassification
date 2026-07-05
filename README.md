This project was developed as part of a research initiative under the guidance of a faculty member at D.J. Sanghvi College of Engineering. The objective was to build a deep learning model capable of fine-grained bird species classification using the Stanford Birds (CUB-200) dataset.

A pre-trained ResNet convolutional neural network (CNN) was fine-tuned through transfer learning to adapt it to the bird classification task. The project involved dataset preprocessing, model training, hyperparameter tuning, and evaluation to improve classification performance on visually similar bird species.

The trained model was integrated with a simple web interface, allowing users to upload an image and receive the predicted bird species in real time. This project demonstrates the application of transfer learning and computer vision techniques to fine-grained image classification problems.

Technologies Used
Python
PyTorch
ResNet (Transfer Learning)
Stanford CUB-200 Bird Dataset
Flask (Backend)
HTML, CSS, JavaScript (Frontend)


##INSTALLATION

Clone the repository to your local machine using the following command:
```bash
git clone https://github.com/aasmithadhani/birdClassification.git
```
##Backend
Navigate to the project directory:
```bash
cd backend
```

Create a virtual environment:
```bash
python3 -m venv venv
```

Activate the virtual environment:
- On Windows:
  ```bash
  .\venv\Scripts\activate
  ```
Install the dependencies using the following command:
```bash
pip install -r requirements.txt
```

Installing flask
````bash
pip install flask
````

Installing flask_cors
````bash
pip install flask_cors
````

usage:
```bash
python app.py
```


##Frontend
Navigate to the project directory:
```bash
cd frontend
```

Install the dependencies using the following command:
```bash
npm i --force
```

Usage:
````bash
npm start
````


