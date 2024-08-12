# new_server_module/views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

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
                return JsonResponse({'error': 'API key not provided'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    return JsonResponse({'error': 'Invalid request'}, status=400)
