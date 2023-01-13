from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from .serializers import UserSerializer, ItemSerializer
from django.http.response import JsonResponse
from .models import UserProfile, Item
from django.http.response import Http404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.contrib.gis.geos import Point
from rest_framework.permissions import IsAuthenticated



class UserView(APIView):
    # permission_classes = [IsAuthenticated]
    def get_object(self, id):
        try:
            return UserProfile.objects.get(pk = id)
        except UserProfile.DoesNotExist:
            raise Http404

    def get(self, request, id=None):
        if id:
            user = self.get_object(id)
            serializer = UserSerializer(user)
        else:
            users = UserProfile.objects.all()
            serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id=None):
        user = self.get_object(id)
        serializer = UserSerializer(user, data=request.data, partial=True )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request, id=None):
        user = self.get_object(id)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ItemView(APIView):

    def get_item(self, id):
        try:
            return Item.objects.get(pk = id)
        except:
            raise Http404

    def get(self, request, id=None):
        if id:
            item = self.get_item(id)
            serializer = UserSerializer(item)
        else:
            items = Item.objects.all()
            serializer = ItemSerializer(items, many=True)
        return Response(serializer.data)

    def post(self, request):
        print(request.data)
        serializer = ItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id=None):
        item = self.get_item(id)
        serializer = ItemSerializer(item, data=request.data, partial=True )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request, id=None):
        item = self.get_item(id)
        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
# from allauth.socialaccount.providers.oauth2.client import OAuth2Client
# from dj_rest_auth.registration.views import SocialLoginView

# class GoogleLogin(SocialLoginView): # if you want to use Authorization Code Grant, use this
#     adapter_class = GoogleOAuth2Adapter
#     callback_url = '1029888009386-fee8kup4cp300op9r2629qkga9pa81ia.apps.googleusercontent.com'
#     client_class = OAuth2Client
#     def post(self, request):
#         print(request.data)
#         serializer = UserSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class GoogleLogin(SocialLoginView): # if you want to use Implicit Grant, use this
#     adapter_class = GoogleOAuth2Adapter