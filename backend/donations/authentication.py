from .models import UserProfile
from rest_framework import authentication
from rest_framework.response import Response
from rest_framework import exceptions
import firebase_admin as admin
import firebase_admin.auth as auth


from .exceptions import FirebaseError
from .exceptions import InvalidAuthToken
from .exceptions import NoAuthToken

import firebase_admin
from firebase_admin import credentials
from django.conf import settings

firebase_creds = credentials.Certificate(settings.FIREBASE_CONFIG)
firebase_app = firebase_admin.initialize_app(firebase_creds)


class FirebaseAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        if request.method == 'GET' and request.path in '/api/v1/items':
            return None
        else:
            req_header = request.META.get('HTTP_AUTHORIZATION')
            if not req_header:
                raise NoAuthToken("No auth token provided")
            token = req_header.split(" ").pop()
            decoded_token = None
            print(token)
            try:
                decoded_token = auth.verify_id_token(token)
                print(decoded_token)
            except Exception:
                raise InvalidAuthToken("Invalid auth token")
            
            if not token or not decoded_token:
                return None
            user = None
            try:
                uid = decoded_token["uid"]
                user = UserProfile.objects.get(uid = uid)
            except UserProfile.DoesNotExist:
                raise exceptions.AuthenticationFailed('No such user')

            return (user, None)
            

