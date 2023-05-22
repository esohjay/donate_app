from rest_framework import serializers
from rest_framework_gis.serializers import GeoFeatureModelSerializer
from .models import UserProfile, Item
from django.contrib.gis.measure import Distance
from django.contrib.gis.db.models.functions import Distance as DistanceFunc
from geopy.distance import geodesic


class UserSerializer(GeoFeatureModelSerializer):
    """A class to serialize locations as GeoJSON compatible data"""

    class Meta:
        model = UserProfile
        geo_field = "cordinates"
        fields = "__all__"


class ItemSerializer(GeoFeatureModelSerializer):
    """A class to serialize locations as GeoJSON compatible data"""

    distance = serializers.SerializerMethodField()

    def get_distance(self, obj):
        # Calculate the distance between the point and the given location
        # distance = obj.cordinates.distance(self.context["cordinates"])
        if self.context and self.context["cordinates"]:
            return geodesic(
                (obj.cordinates[1], obj.cordinates[0]), self.context["cordinates"]
            ).miles
        else:
            return None
        # return distance

    # convert the
    class Meta:
        model = Item
        geo_field = "cordinates"
        fields = (
            "id",
            "name",
            "description",
            "is_active",
            "created_date",
            "category",
            "user",
            "transaction_type",
            "distance",
        )


#  ("__all__", "distance")
