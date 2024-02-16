import pickle
import PyPDF2
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem.wordnet import WordNetLemmatizer
import sklearn.feature_extraction.text

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
