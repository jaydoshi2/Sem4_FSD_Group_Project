# course_recommendations/urls.py

from django.urls import path
from .views import get_course_recommendations

urlpatterns = [
    path('getrecommendations/', get_course_recommendations, name='get_course_recommendations'), 
]
