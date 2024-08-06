# myapp/views.py
from django.http import JsonResponse

def handle_api_keys(request):
    if request.method == 'POST':
        api_key = request.POST.get('api_key')
        # Process the API key as needed
        return JsonResponse({'message': 'API key received'})
    return JsonResponse({'error': 'Invalid request'}, status=400)
