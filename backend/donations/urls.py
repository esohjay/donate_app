from django.urls import path

from .views import UserView, ItemView

app_name = 'donations'
urlpatterns = [
    path('users', UserView.as_view(), name='All users'),
    path('users/<int:id>', UserView.as_view(), name='User Details'),
    path('items', ItemView.as_view(), name='All items'),
    path('items/<int:id>', ItemView.as_view(), name='Item Details'),
    # path('auth/google/', GoogleLogin.as_view(), name='google_login')

]
