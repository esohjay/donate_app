from rest_framework import serializers
from rest_framework_gis.serializers import GeoFeatureModelSerializer
from .models import UserProfile, Item


class UserSerializer(GeoFeatureModelSerializer):
    """ A class to serialize locations as GeoJSON compatible data """
    class Meta:
        model = UserProfile
        geo_field = 'cordinates'
        fields = '__all__'

class ItemSerializer(GeoFeatureModelSerializer):
    """ A class to serialize locations as GeoJSON compatible data """
    class Meta:
        model = Item
        geo_field = 'cordinates'
        fields = '__all__'
        
        # ('id',
        #           'name',
        #           'description',
        #           'is_active',
        #           'created_date',
        #           'category',
        #           'user',
        #           'transaction_type')