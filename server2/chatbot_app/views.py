from rest_framework.decorators import api_view
from rest_framework.response import Response
from .chat import get_response
import os
from django.http import HttpResponse

@api_view(['POST'])
def predict(request):
    nltk_data_path = 'E:\\Sem4_FSD_Group_Project\\server2\\chatbot_app\\nltk_data'
    if not os.path.exists(nltk_data_path):
        return HttpResponse("NLTK data directory not found.")
    else:
        text = request.data.get('message')
        response = get_response(text)
        message = {'answer': response}
        return Response(message)