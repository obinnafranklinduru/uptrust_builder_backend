import pickle
import PyPDF2
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem.wordnet import WordNetLemmatizer
import sklearn.feature_extraction.text
from flask import Flask, render_template, request

app = Flask(__name__)

#Reading in the pickled model and vectorizer
with open('cv_model.pkl', 'rb') as file:
    model = pickle.load(file)

with open('vectorizer.pkl', 'rb') as file:
    vectorizer = pickle.load(file)

#Text preprocessing function
def preprocess_text(text):
    #Lowercase

    text = text.lower()
    #Tokenization
    tokens = word_tokenize(text)

    #Stopwords and punctuation removal
    stop_words = set(stopwords.words('english'))
    filtered_tokens = [word for word in tokens if word.isalnum() and word not in stop_words]
   
   #Lemmantization
    wordnet = WordNetLemmatizer()
    lemmantized_tokens = [wordnet.lemmatize(word) for word in filtered_tokens]
    
    #Joining tokens back into text
    preprocessed_text = ' '.join(lemmantized_tokens)
    
    return preprocessed_text

#PDF file reading function
def extract_text_from_pdf(pdf_file):
    text = ''
    reader = PyPDF2.PdfReader(pdf_file)
    for page_num in range(reader.numPages):
        text += reader.getPage(page_num).extractText()
    return text

#Flask app actions
@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        user_cv = request.files['cv']
        user_cv_text = extract_text_from_pdf(user_cv) #Extracts text from the pdf file
        user_job_description = request.form['job_description']

        #Calling the preprocessing function on user input
        user_cv_text = preprocess_text(user_cv_text)
        user_job_description = preprocess_text(user_job_description)

        # Feature Extraction for User Input
        user_combined_features = vectorizer.transform([user_cv_text + ' ' + user_job_description])

        # Prediction
        prediction = model.predict(user_combined_features)[0]

        return render_template('results.html', prediction=prediction)

    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
