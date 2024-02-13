import nltk
from flask import Flask, render_template, request

app = Flask(__name__)

# Load the trained model and vectorizer
# Note: You need to replace 'model.pkl' and 'vectorizer.pkl' with your actual model and vectorizer files.
import pickle

with open('cv_model.pkl', 'rb') as file:
    model = pickle.load(file)

with open('vectorizer.pkl', 'rb') as file:
    vectorizer = pickle.load(file)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        # User pastes in job description
        user_cv = request.files['cv'].read().decode('utf-8')
        user_job_description = request.form['job_description']

def preprocess_text(text):
    #Lowercase
    text = text.lower()
    
    #Tokenization
    tokens = word_tokenize(text)
    
    #Stopwords and punctuation removal
    stop_words = set(stopwords.words('english'))
    filtered_tokens = [word for word in tokens if word.isalnum() and word not in stop_words]
   
   #Stemming
    stemmer = PorterStemmer()
    stemmed_tokens = [stemmer.stem(word) for word in filtered_tokens]
    
    #Joining tokens back into text
    preprocessed_text = ' '.join(stemmed_tokens)
    
    return preprocessed_text


# Preprocess user input
user_cv = preprocess_text(user_cv)
user_job_description = preprocess_text(user_job_description)

# Feature Extraction for User Input
user_combined_features = vectorizer.transform([user_cv + ' ' + user_job_description])

