from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from .serializers import UserSerializer, ItemSerializer
from django.http.response import JsonResponse
from .models import User, Item
from django.http.response import Http404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status



class UserView(APIView):

    def get_object(self, id):
        try:
            return User.objects.get(pk = id)
        except User.DoesNotExist:
            raise Http404

    def get(self, request, id=None):
        if id:
            user = self.get_object(id)
            serializer = UserSerializer(user)
        else:
            users = User.objects.all()
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