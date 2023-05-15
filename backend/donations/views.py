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
# from .permissions import AllowOwner

from firebase_admin import credentials
from firebase_admin import auth
from django.conf import settings
import firebase_admin


# firebase_creds = credentials.Certificate(settings.FIREBASE_CONFIG)
# firebase_app = firebase_admin.initialize_app(firebase_creds)



class UserView(APIView):
    # permission_classes = [IsAuthenticated]
    # permission_classes = [AllowOwner]
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
        print(request.user)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id=None):
        user = self.get_object(id)
        if request.user and user.uid == request.user.uid:
            serializer = UserSerializer(user, data=request.data, partial=True )
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED, )
    def delete(self, request, id=None):
        user = self.get_object(id)
        if request.user and user.uid == request.user.uid:
            user.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)


class ItemView(APIView):

    def get_item(self, id):
        try:
            return Item.objects.get(pk = id)
        except:
            raise Http404

    def get(self, request, id=None):
        if id:
            item = self.get_item(id)
            serializer = ItemSerializer(item)
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
        if request.user and item.user == request.user.uid:
            serializer = ItemSerializer(item, data=request.data, partial=True )
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
    def delete(self, request, id=None):
        item = self.get_item(id)
        if request.user and item.user == request.user.uid:
            item.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
