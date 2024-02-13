import requests

MODEL = "gpt-3.5-turbo"

headers = {
         "Content-Type": "appliation/json",
         "Authorization": f"Bearer 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"
      }

payload = {
         'model': "gpt-3.5-turbo",
         'messages': [{"role": "user", "content": "what is the total amount of gold in the world"}],
         'temperature': 0.7,
         'max_tokens': 200
        }

response = requests.post(url='https://api.openai.com/v1/chat/completions', headers=headers, json=payload)

if response.status_code == 200:
    result = response.json()
    generated_email = result['choices'][0]['text'].strip()
    print(generated_email)
else:
    print("Error:", response.text)
    print(None)