# new_server_module/urls.py
from django.urls import path
from . import views
from .views import ChatbotAPI

urlpatterns = [
    path('handle-api-keys/', views.handle_api_keys, name='handle_api_keys'),
     path('api/chatbot/', ChatbotAPI.as_view(), name='chatbot'),
]
