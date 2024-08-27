# new_server_module/views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
# from .models import ChatMessage
from transformers import pipeline


@csrf_exempt
def handle_api_keys(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            api_key = data.get('api_key')
            print(api_key)
            if api_key:
                # Process the API key as needed
                return JsonResponse({'message': 'API key received'})
            else:
                return JsonResponse({'error': 'API key not provided'},
                                    status=400)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    return JsonResponse({'error': 'Invalid request'}, status=400)


class ChatbotAPI(APIView):

    def post(self, request):

        # if not user_input:
        #     return Response({'error': 'User input is required'}, status=status.HTTP_400_BAD_REQUEST)

        save_directory = "C:\\fine-tuned-flan-t5"

        # Load the pipeline with the local model and tokenizer
        chatbot = pipeline('text2text-generation',
                           model=save_directory,
                           tokenizer=save_directory)
        # # model_response = chatbot(user_input)[0]['generated_text']
        # user_input = request.data.get('user_input')
        # response = chatbot(user_input)
        # print(response[0]['generated_text'])
        while True:

            user_input = input('Enter message: ')
            response = chatbot(user_input)
            print(response[0]['generated_text'])

        # return Response({
        #     'user_input': chat_message.user_input,
        #     'model_response': chat_message.model_response,
        #     'created_at': chat_message.created_at.isoformat()
        # })
