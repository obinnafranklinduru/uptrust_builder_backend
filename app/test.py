# import requests

# MODEL = "gpt-3.5-turbo"

# headers = {
#          "Content-Type": "appliation/json",
#          "Authorization": f"Bearer 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"
#       }

# payload = {
#          'model': "gpt-3.5-turbo",
#          'messages': [{"role": "user", "content": "what is the total amount of gold in the world"}],
#          'temperature': 0.7,
#          'max_tokens': 200
#         }

# response = requests.post(url='https://api.openai.com/v1/chat/completions', headers=headers, json=payload)

# if response.status_code == 200:
#     result = response.json()
#     generated_email = result['choices'][0]['text'].strip()
#     #(generated_email)
# else:
#     #("Error:", response.text)
#     #(None)

# import os
# import PyPDF2

# file_name = os.path.abspath(r"C:\Users\USER\uptrust_builder_backend\app\tree.txt")
# #(file_name)
from flask import Flask, request

app = Flask(__name__)

@app.route('/cv_analyser', methods=['POST'])
def cv_analyser():
    print([i for i in request.files])
    if 'file' not in request.files:
        return 'No file part'
    file = request.files['file']
    if file.filename == '':
        return 'No selected file'
    if file:
        file.save('cv_file.pdf')  # Save the PDF file to the working directory as cv_file.pdf
        # Call CvAnalyser function
        return 'File uploaded successfully'

if __name__ == "__main__":
    app.run(debug=True)
