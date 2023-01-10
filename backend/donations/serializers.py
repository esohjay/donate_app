from rest_framework import serializers
from .models import User, Item


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id',
                  'fname',
                  'lname',
                  )

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ('id',
                  'name',
                  'description',
                  'is_active',
                  'created_date',
                  'category',
                  'user',
                  'transaction_type')