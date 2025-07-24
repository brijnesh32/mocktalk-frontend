from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from dotenv import load_dotenv
from groq import Groq
from .mongo_models import Report 
import os, json
from bson import ObjectId
from mongoengine.errors import DoesNotExist

# Load environment variables
load_dotenv()
groq_client = Groq(api_key=os.getenv("GROQ_API_KEY"))

@csrf_exempt
def start_interview(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            name = data.get("name")
            role = data.get("role")
            education = data.get("education")
            experience = data.get("experience")
            skills = data.get("skills") or []
            question_count = int(data.get("question_count", 5))

            # Support comma-separated skills string
            if isinstance(skills, str):
                skills = [s.strip() for s in skills.split(",")]

            prompt = f"""
Generate {question_count} interview questions for a candidate applying for the role of "{role}".
The candidate has the following background:
- Education: {education}
- Experience: {experience}
- Skills: {', '.join(skills)}

Return ONLY a valid JSON list of strings. Do not add any explanation, introduction, or formatting.
"""

            response = groq_client.chat.completions.create(
                model="llama3-70b-8192",
                messages=[{"role": "user", "content": prompt}]
            )

            content = response.choices[0].message.content.strip()
            print("🧠 Groq Response:", content)

            try:
                questions = json.loads(content)
                if not isinstance(questions, list):
                    raise ValueError("Groq response is not a list")
            except Exception as e:
                return JsonResponse({
                    "error": "Failed to parse questions",
                    "raw": content,
                    "details": str(e)
                }, status=500)

            return JsonResponse({
                "questions": questions,
                "temp_user_info": {
                    "name": name,
                    "role": role,
                    "education": education,
                    "experience": experience,
                    "skills": skills
                }
            })

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid method"}, status=405)


import re

@csrf_exempt
def submit_answers(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            name = data.get("name")
            role = data.get("role")
            questions = data.get("questions")
            answers = data.get("answers")

            if not questions or not answers or len(questions) != len(answers):
                return JsonResponse({"error": "Questions and answers must be matched"}, status=400)

            # Prompt to AI
            prompt = "Evaluate this interview and return JSON with keys: score (0-100), strengths (list), improvements (list), summary.\n\n"
            for i in range(len(questions)):
                prompt += f"Q{i+1}: {questions[i]}\nA{i+1}: {answers[i]}\n"
            prompt += "\nRespond only with raw JSON. No explanation. No markdown like ```json."

            response = groq_client.chat.completions.create(
                model="llama3-70b-8192",
                messages=[{"role": "user", "content": prompt}]
            )

            raw_content = response.choices[0].message.content.strip()
            print("🧠 AI Raw Response:", raw_content)

            # Extract JSON from messy response
            match = re.search(r'({.*})', raw_content, re.DOTALL)
            if not match:
                return JsonResponse({
                    "error": "Could not extract JSON from AI response",
                    "raw": raw_content
                }, status=500)

            cleaned = match.group(1)
            feedback = json.loads(cleaned)

            return JsonResponse({
                "message": "Interview evaluated successfully",
                "feedback": feedback
            })

        except Exception as e:
            print("❌ Exception in submit_answers:", e)
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid method"}, status=405)

from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
from .mongo_models import Report

@csrf_exempt
def save_report(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)

            name = data.get('name')
            email = data.get('email')
            role = data.get('role')
            score = data.get('score')
            strengths = data.get('strengths', '')
            improvements = data.get('improvements', '')
            created_at = data.get('created_at')

            # ✅ Check if a report with the same details already exists
            duplicate = Report.objects(
                name=name,
                email=email,
                role=role,
                score=score,
                strengths=strengths,
                improvements=improvements
            ).first()

            if duplicate:
                return JsonResponse({'message': 'Report already exists'}, status=400)

            # ✅ Save new report if not duplicate
            report = Report(
                name=name,
                email=email,
                role=role,
                score=score,
                strengths=strengths,
                improvements=improvements,
                created_at=created_at
            )
            report.save()
            return JsonResponse({'message': 'Report saved successfully'}, status=201)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request'}, status=400)


 
@csrf_exempt
def get_all_reports(request):
    try:
        email = request.GET.get("email")
        if not email:
            return JsonResponse({"error": "Email query param is required"}, status=400)

        reports = Report.objects(email=email)  # 🔍 Filter by logged-in user
        report_list = []

        for report in reports:
            report_list.append({
                "id": str(report.id),
                "name": report.name,
                "role": report.role,
                "score": report.score,
                "strengths": report.strengths,
                "improvements": report.improvements,
                "summary": report.summary,
                "created_at": report.created_at.strftime("%d-%m-%Y %H:%M:%S"),
            })

        return JsonResponse({"reports": report_list}, safe=False)
    except Exception as e:
        print("Error fetching reports:", e)
        return JsonResponse({"error": str(e)}, status=500)

