from django.http import HttpResponseBadRequest
from firebase_admin import auth

class FirebaseAuthMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        id_token = request.headers.get('Authorization', '').split(' ')[1]
        try:
            decoded_token = auth.verify_id_token(id_token)
            request.user = decoded_token
            return self.get_response(request)
        except auth.InvalidIdTokenError:
            return HttpResponseBadRequest('Invalid ID token')
