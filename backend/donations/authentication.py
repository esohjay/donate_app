from .models import UserProfile
from rest_framework import authentication
from rest_framework.response import Response
from rest_framework import exceptions
import firebase_admin as admin
import firebase_admin.auth as auth


from .exceptions import FirebaseError
from .exceptions import InvalidAuthToken
from .exceptions import NoAuthToken


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
            try:
                decoded_token = auth.verify_id_token(token)
                request.user = decoded_token
                return (request.user, None)
            except Exception:
                raise InvalidAuthToken("Invalid auth token")
            
            # if not token or not decoded_token:
            #     return None
            # user = None
            # try:
            #     uid = decoded_token["uid"]
            #     user = UserProfile.objects.get(uid = uid)
            # except UserProfile.DoesNotExist:
            #     # raise exceptions.AuthenticationFailed('No such user')
            #     return None

            # return (user, None)
            

