from mongoengine import Document, StringField, ListField, IntField, DateTimeField, EmailField
from datetime import datetime

class Report(Document):
    name = StringField(required=True)
    email = EmailField(required=True)
    role = StringField()
    questions = ListField(StringField())
    answers = ListField(StringField())
    score = IntField()
    strengths = ListField(StringField())
    improvements = ListField(StringField())
    summary = StringField()
    created_at = DateTimeField(default=datetime.utcnow)
