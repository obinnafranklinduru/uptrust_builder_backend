## Introduction.
  This is the documentation for the machine learning model behind UpTrust, an AI-powered career readiness tool. This documentation aims to guide users in understanding and utilizing our model, which predicts the suitability of a CV for a given job description.

## Getting Started.
To run this model, you need to have the following libraries installed: Pandas, NLTK, TfidfVectorizer, scikit-learn. The model and vecorizer have been saved in pickle files for further integrations.

## Model Overview.
   Our model is a Logistic Regression model, a statistical model commonly used for binary classification tasks like ours. It analyzes the textual content of CVs and job descriptions to make predictions.

## Training Data.
Our training data, both gotten from Kaggle, consists of 2 datasets: one containing CVs from data scientists, and the other containing corresponding job descriptions. These two datasets were then merged into one dataframe and a third column, 'Match'. Each CV was labeled with a binary indicator (1 for a good match, 0 for not a good match) based on its similarity to the job description and this score which serves as a binary indicator showing whether a resume is a good match or not, and this score made up the Match column.

## Training Procedure.
   The model was trained using the collected datasets. Text preprocessing techniques such as tokenization and TF-IDF vectorization were applied, the data was split into training and testing sets, and then used in training the Logistic Regression model.

## Model Evaluation.
   The model's performance using metrics such as: accuracy, precision, recall, and F1-score. Our model achieved an accuracy of 1.0 indicating its effectiveness in predicting the match between CVs and job descriptions.

## Usage.
  To use the model, upload your CV as prompted (ensure that the CV is in PDF format), paste in the job description in the text area and click on 'Submit'. The model will then output a prediction showing how well your CV matches the job description.

## Future Work.
   Subesquently, we plan to enhance the model's ability by expanding the datasets used in training to include job roles other than Data Scientist.
