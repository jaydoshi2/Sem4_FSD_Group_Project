# models.py
from django.db import models


class ChatMessage(models.Model):
    user_input = models.TextField()
    model_response = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

