import openai
import requests
from dotenv import load_dotenv
import os

load_dotenv()

URL='https://api.openai.com/v1/chat/completions'
API_KEY=os.getenv('API_KEY')
MODEL="gpt-3.5-turbo"

class AI_assistant():
    def __init__(self, portfolio="My Portfolio") -> None:
        self.portfolio = portfolio

    def feedback_email(
            self,
            company="FutureDevs",
            job_description=
            """Front End Developer
                Future Devs
                Lagos
                ₦250,000 - ₦300,000 a month
                Full-time
                Easily apply
                Reports to: Back-end Lead.
                Minimum: Proven experience as a frontend Experience developer.
                Collaborate with designers, backend developers and other stakeholders
            """,
            application_letter=""""""):
         openai.api_key = API_KEY
         messages = [
            {"role": "system", "content": "You are an Email writer, helping users write good, neat and appealing email"},
            {"role": "user", "content": "I want to write an email to a software company where I recently applied as a full stack developer, asking if the role is still empty or has been given to someone else"},
            {"role": "Email writer", "content": "Subject: Inquiry about Full Stack Developer Position\n\nDear [Company Name] Hiring Team,\n\nI hope this email finds you well. I recently applied for the Full Stack Developer position at [Company Name] and wanted to kindly inquire about the status of my application.\n\nI am extremely enthusiastic about the opportunity to join [Company Name] and contribute to your innovative software development projects. With my strong background in full stack development and passion for creating efficient and user-friendly applications, I believe I would be a valuable addition to your team.\n\nSince submitting my application on [Date], I wanted to confirm if the position is still available or if it has been filled. If it is still open, I would appreciate any updates on the application process, such as potential next steps or an estimated timeline for further evaluation.\n\nI would also like to take this opportunity to reiterate my strong interest in joining [Company Name]. I have thoroughly researched your company and been impressed by your commitment to delivering cutting-edge software solutions in the industry. The company's culture and values align perfectly with my own professional aspirations.\n\nI am confident that my skills in [mention relevant languages, frameworks, or technologies] and my ability to work collaboratively in a team environment would make me a valuable asset to [Company Name]. My experience in developing robust applications, as well as my strong problem-solving and communication skills, would enable me to contribute effectively to your ongoing projects.\n\nThank you for considering my application. I look forward to hearing from you soon regarding the status of my application and any potential next steps. Should you require any additional information or documentation, please do not hesitate to contact me.\n\nThank you for your time and consideration.\n\nSincerely,\n\n[Your Name]\n[Your Contact Information]"},
            {"role": "user", "content": ""}
            ]
         payload = {
            'model': 'gpt-3.5-turbo',
            'messages': messages,
            'temparature': 0.7
            }
         headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {openai.api_key}'
            }

    def cv_email(
            self,
            company="Future Devs",
            About="This is a Fin tech company that builds world solutions to quick payments. Modt especially in Africa",
            job_description=
                """
                Front End Developer
                Future Devs
                Lagos
                ₦250,000 - ₦300,000 a month
                Full-time
                Easily apply
                Reports to: Back-end Lead.
                Minimum: Proven experience as a frontend Experience developer.
                Collaborate with designers, backend developers and other stakeholders
                """, portfolio=""):
        openai.api_key = API_KEY
        messages = [
            {"role": "system", "content": "You are an Email writer, helping users write good, neat and appealing email"},
            {"role": "user", "content": "I want to write an email to a software company where I recently applied as a full stack developer, asking if the role is still empty or has been given to someone else"},
            {"role": "system", "content": "Subject: Inquiry about Full Stack Developer Position\n\nDear [Company Name] Hiring Team,\n\nI hope this email finds you well. I recently applied for the Full Stack Developer position at [Company Name] and wanted to kindly inquire about the status of my application.\n\nI am extremely enthusiastic about the opportunity to join [Company Name] and contribute to your innovative software development projects. With my strong background in full stack development and passion for creating efficient and user-friendly applications, I believe I would be a valuable addition to your team.\n\nSince submitting my application on [Date], I wanted to confirm if the position is still available or if it has been filled. If it is still open, I would appreciate any updates on the application process, such as potential next steps or an estimated timeline for further evaluation.\n\nI would also like to take this opportunity to reiterate my strong interest in joining [Company Name]. I have thoroughly researched your company and been impressed by your commitment to delivering cutting-edge software solutions in the industry. The company's culture and values align perfectly with my own professional aspirations.\n\nI am confident that my skills in [mention relevant languages, frameworks, or technologies] and my ability to work collaboratively in a team environment would make me a valuable asset to [Company Name]. My experience in developing robust applications, as well as my strong problem-solving and communication skills, would enable me to contribute effectively to your ongoing projects.\n\nThank you for considering my application. I look forward to hearing from you soon regarding the status of my application and any potential next steps. Should you require any additional information or documentation, please do not hesitate to contact me.\n\nThank you for your time and consideration.\n\nSincerely,\n\n[Your Name]\n[Your Contact Information]"},
            {"role": "user", "content": f"My Portfolio:{portfolio}\n{company}\n{About}\nWrite an email to {company} to attach to my CV. This is their Job Description\n{job_description}. Use all this information to write the email, don't add any placeholders or replacement texts"}
        ]
        payload = {
            'model': 'gpt-3.5-turbo',
            'messages': messages,
            'temperature': 0.7
        }

        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {openai.api_key}'
        }

        _email = requests.post(url=URL, headers=headers, json=payload, stream=False)
        return _email.text

assistant = AI_assistant()
portfolio = """
              [Cyril Emmanuel]
              [Lagos, Nigeria]
              [+2347789899]
              [emma232@gmail.com]
              [https://linkd/cyrilmyles]
              [https://fake_website.com/]

              Objective:
              ---------------
              Enthusiastic and detail-oriented Frontend Developer with three years of professional experience in creating captivating and user-friendly web applications. Proven expertise in translating design concepts into seamless and responsive user interfaces. Eager to contribute technical skills and creative problem-solving to a dynamic development team.

              Professional Experience:
              -----------------------
              **Lead Frontend Developer | Digital Innovations Ltd., Lagos, Nigeria | March 2022 - Present**
              - Spearhead the development of innovative frontend solutions, ensuring optimal user experiences and adherence to project timelines.
              - Collaborate closely with UI/UX designers to implement design mockups and prototypes.
              - Successfully lead the migration of a legacy system to a modern, responsive, and user-friendly interface, resulting in a 20% increase in user engagement.

              **Frontend Developer | Tech Solutions Inc., Lagos, Nigeria | July 2019 - February 2022**
              - Played a key role in the development of dynamic and visually appealing websites for various clients in industries such as e-commerce, healthcare, and finance.
              - Collaborated with backend developers to integrate frontend components with server-side logic, ensuring seamless functionality.
              - Implemented and maintained responsive design principles, improving the overall accessibility of web applications.

              Technical Skills:
              -----------------
              - **Languages:** HTML5, CSS3, JavaScript (ES6+)
              - **Frameworks/Libraries:** React.js, Angular
              - **Version Control:** Git, GitHub
              - **Responsive Design:** Bootstrap, CSS Grid, Flexbox
              - **Build Tools:** Webpack, Babel
              - **Testing/Debugging:** Jest, React Testing Library
              - **Package Managers:** npm, Yarn
              - **Coding Standards:** ESLint, Prettier

              Education:
              -----------
              **Bachelor of Science in Computer Science | University Name | Graduation Date**

              Projects:
              ---------
              1. **E-commerce Website Revamp**
                - Led the redesign and development of a client's e-commerce website, resulting in a 30% increase in user engagement and a more intuitive shopping experience.

              2. **Task Management Application**
                - Developed a task management application using React.js, incorporating drag-and-drop functionality for task prioritization. This project improved team collaboration and project tracking.

              3. **Weather App**
                - Created a responsive weather application that provides real-time weather data based on user location. Integrated with a third-party API for accurate weather information.

              Certifications:
              ---------------
              - **Frontend Web Developer Certification | Online Learning Platform | Date Obtained**

              References:
              -----------
              Available upon request.
            """
print(assistant.cv_email(portfolio=portfolio))
