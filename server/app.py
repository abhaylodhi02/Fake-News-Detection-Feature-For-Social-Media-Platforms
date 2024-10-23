from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
from PIL import Image
import pytesseract
from tensorflow import keras
import regex as re
import nltk
import numpy as np
import cv2

# Download the stopwords
nltk.download('stopwords')
stop_words = nltk.corpus.stopwords.words('english')

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "https://fake-news-detection-feature-for-social-media-platforms.vercel.app"}}) # Enable CORS for all routes
app.config['SECRET_KEY'] = 'supersecretkey'
app.config['UPLOAD_FOLDER'] = 'server/uploads'

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file:
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(file.filename))
        file.save(file_path)
        result = evaluate(file_path)
        return jsonify({"result": result})  # Return the prediction as JSON
    
    return jsonify({"error": "File upload failed"}), 500

def evaluate(file_path):
    pytesseract.pytesseract.tesseract_cmd = '/usr/bin/tesseract'  # Example path for Linux
    # img = Image.open(file_path)
    # text = pytesseract.image_to_string(img)
    text = process_image(file_path)
    prediction = prediction_on_custom_input(text)
    return [prediction,text]

def preprocess_image(image):
    # Check if the image is already grayscale
    if len(image.shape) == 2:
        gray = image  # Image is already grayscale
    else:
        # Convert to grayscale
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    return gray

def extract_text(image):
    # Extract text from the preprocessed image using pytesseract
    return pytesseract.image_to_string(image)

def process_image(path):
    # Load the image from the given path
    img = cv2.imread(path)

    # Check if the image was loaded successfully
    if img is None:
        print("Error: Could not read the image.")
        return ""

    # Preprocess the image (convert to grayscale only)
    preprocessed_img = preprocess_image(img)

    # Extract text from the preprocessed image
    text = extract_text(preprocessed_img)

    return text


def prediction_on_custom_input(text):
    encoded = word_embedding(text)
    max_length = 42

    # Pad the sequence
    padded_encoded_title = keras.preprocessing.sequence.pad_sequences(encoded, maxlen=max_length, padding='pre')

    model_path = './Model/-Fake_news_predictor.h5'
    custom_objects = {'Orthogonal': keras.initializers.Orthogonal(), 'LSTM': keras.layers.LSTM, 'GlorotUniform': keras.initializers.GlorotUniform()}

    model = keras.models.load_model(model_path, custom_objects=custom_objects)

    output = model.predict(padded_encoded_title)
    output = np.where(0.4 > output, 1, 0)

    if output[0][0] == 1:
        return 'Yes, this news is fake'
    return 'No, it is not fake'

def word_embedding(text):
    preprocessed_text = preprocess_filter(text)
    return one_hot_encoded(preprocessed_text)

def one_hot_encoded(text, vocab_size=5000, max_length=40):
    tokenizer = keras.preprocessing.text.Tokenizer(num_words=vocab_size)
    tokenizer.fit_on_texts([text])
    hot_encoded = tokenizer.texts_to_sequences([text])
    hot_encoded = keras.preprocessing.sequence.pad_sequences(hot_encoded, maxlen=max_length, padding='pre')
    return hot_encoded

text_cleaning = r"\b0\S*|\b[^A-Za-z0-9]+"

def preprocess_filter(text, stem=False):
    text = re.sub(text_cleaning, " ", str(text.lower()).strip())
    tokens = []
    for token in text.split():
        if token not in stop_words:
            if stem:
                stemmer = nltk.stem.snowball.SnowballStemmer(language='english')
                token = stemmer.stem(token)
            tokens.append(token)
    return " ".join(tokens)


if __name__ == '__main__':
    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        os.makedirs(app.config['UPLOAD_FOLDER'])
    app.run(debug=True)
