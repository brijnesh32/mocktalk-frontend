from django.urls import path
from .views import start_interview, submit_answers, save_report, get_all_reports

urlpatterns = [
    path("api/start-interview/", start_interview),
    path("api/submit-answers/", submit_answers),
    path('api/save-report/', save_report),
    path('api/reports/', get_all_reports),
]
