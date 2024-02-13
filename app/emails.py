import requests
from dotenv import load_dotenv
import requests
import os
load_dotenv()

URL='https://api.openai.com/v1/chat/completions'
API_KEY=os.getenv('API_KEY')
MODEL="gpt-3.5-turbo"

class EmailGenerator:
    """
     EmailGenerator: EmailGenerator takes the job description, applicant's name, and email as input
                    and generates a customized email for job application using OpenAI's GPT-3 API.
    """
    def __init__(self, api_key=API_KEY):
        self.api_key = api_key
     
    def generate_email(self, job_description, applicant_name, applicant_email):
      # Crafting email template
      email_template = f"""Dear Hiring Manager,\n\nI am writing to express my interest in the {job_description['title']} position at {job_description['company']} as advertised on {job_description['source']}./
                        \n\nBased on the job description, I believe that my {', '.join(job_description['skills'])} skills make me a strong candidate for this role./
                         Additionally, my experience in {', '.join(job_description['experience'])} aligns well with the requirements outlined.\n\nAttached to this email, you will find my updated CV./
                          I would welcome the opportunity to further discuss how my background, skills, and enthusiasms can contribute to the {job_description['company']} team. Please feel free to reach out to me at {applicant_email} to schedule a conversation.\n\n/
                          Thank you for considering my application. I look forward to the possibility of working with you.\n\nSincerely,\n{applicant_name}"""

      # Generating email content using GPT-3
      prompt = f"""Generate an email for a job application based on the following job description:\n\n/
                    Job Title: {job_description['title']}\nCompany: {job_description['company']}\n/
                    Skills: {', '.join(job_description['skills'])}\nExperience: {', '.join(job_description['experience'])}\n/
                    Source: {job_description['source']}\n\nApplicant Name: {applicant_name}\nApplicant Email: {applicant_email}\n\n/
                    Email Template:\n{email_template}\n\n"""

      headers = {
         "Content-Type": "appliation/json",
         "Authorization": f"Bearer {self.api_key}"
      }
      
      payload = {
         'model': MODEL,
         'prompt': prompt,
         'temperature': 0.7,
         'max_tokens': 200
        }
      response = requests.post(url=URL, headers=headers, json=payload)

      if response.status_code == 200:
        result = response.json()
        generated_email = result['choices'][0]['text'].strip()
        return generated_email
      else:
        print("Error:", response.text)
        return None

generator = EmailGenerator()

job_description = {
    "title": "Software Engineer",
    "company": "ABC Tech",
    "skills": ["Python", "JavaScript", "SQL"],
    "experience": ["Full-stack development", "Agile methodologies"],
    "source": "LinkedIn"
}

applicant_name = "John Doe"
applicant_email = "john.doe@example.com"

generated_email = generator.generate_email(job_description, applicant_name, applicant_email)
print(generated_email)


# portfolio = """
#               [Cyril Emmanuel]
#               [Lagos, Nigeria]
#               [+2347789899]
#               [emma232@gmail.com]
#               [https://linkd/cyrilmyles]
#               [https://fake_website.com/]

#               Objective:
#               ---------------
#               Enthusiastic and detail-oriented Frontend Developer with three years of professional experience in creating captivating and user-friendly web applications. Proven expertise in translating design concepts into seamless and responsive user interfaces. Eager to contribute technical skills and creative problem-solving to a dynamic development team.

#               Professional Experience:
#               -----------------------
#               **Lead Frontend Developer | Digital Innovations Ltd., Lagos, Nigeria | March 2022 - Present**
#               - Spearhead the development of innovative frontend solutions, ensuring optimal user experiences and adherence to project timelines.
#               - Collaborate closely with UI/UX designers to implement design mockups and prototypes.
#               - Successfully lead the migration of a legacy system to a modern, responsive, and user-friendly interface, resulting in a 20% increase in user engagement.

#               **Frontend Developer | Tech Solutions Inc., Lagos, Nigeria | July 2019 - February 2022**
#               - Played a key role in the development of dynamic and visually appealing websites for various clients in industries such as e-commerce, healthcare, and finance.
#               - Collaborated with backend developers to integrate frontend components with server-side logic, ensuring seamless functionality.
#               - Implemented and maintained responsive design principles, improving the overall accessibility of web applications.

#               Technical Skills:
#               -----------------
#               - **Languages:** HTML5, CSS3, JavaScript (ES6+)
#               - **Frameworks/Libraries:** React.js, Angular
#               - **Version Control:** Git, GitHub
#               - **Responsive Design:** Bootstrap, CSS Grid, Flexbox
#               - **Build Tools:** Webpack, Babel
#               - **Testing/Debugging:** Jest, React Testing Library
#               - **Package Managers:** npm, Yarn
#               - **Coding Standards:** ESLint, Prettier

#               Education:
#               -----------
#               **Bachelor of Science in Computer Science | University Name | Graduation Date**

#               Projects:
#               ---------
#               1. **E-commerce Website Revamp**
#                 - Led the redesign and development of a client's e-commerce website, resulting in a 30% increase in user engagement and a more intuitive shopping experience.

#               2. **Task Management Application**
#                 - Developed a task management application using React.js, incorporating drag-and-drop functionality for task prioritization. This project improved team collaboration and project tracking.

#               3. **Weather App**
#                 - Created a responsive weather application that provides real-time weather data based on user location. Integrated with a third-party API for accurate weather information.

#               Certifications:
#               ---------------
#               - **Frontend Web Developer Certification | Online Learning Platform | Date Obtained**

#               References:
#               -----------
#               Available upon request.
#             """
# print(assistant.cv_email(portfolio=portfolio))
