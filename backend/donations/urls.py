from django.urls import path

from .views import UserView, ItemView

app_name = 'donations'
urlpatterns = [
    path('users', UserView.as_view(), name='All users'),
    path('users/<str:id>', UserView.as_view(), name='User Details'),
    path('items', ItemView.as_view(), name='All items'),
    path('items/<str:id>', ItemView.as_view(), name='Item Details'),
]
