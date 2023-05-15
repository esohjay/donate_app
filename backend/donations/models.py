from django.contrib.gis.db import models
from django.contrib.auth.models import User
from django.conf import settings



# Create your models here.
class UserProfile(models.Model):
    fname= models.CharField('First name', max_length=50, null=True, blank=True)
    lname= models.CharField('Last name', max_length=50, null=True, blank=True)
    cordinates = models.PointField(blank=True, null=True)
    phone = models.CharField('Phone Number', max_length=14, null=True, blank=True, unique=True)
    email = models.CharField('Email address', max_length=50, null=True, blank=True, unique=True)
    is_suspended = models.BooleanField('Suspension status', default=False)
    created_date = models.DateTimeField('date created', auto_now_add=True)
    no_show_count = models.IntegerField('Number of failed picked up', default=0)
    uid = models.CharField( primary_key=True, default=1, max_length=30, unique=True )

    # objects = EmailUserManager()

    
    
    def __str__(self) :
        return self.fname


class Item(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    name = models.CharField('Item name', max_length=1000, null=True, blank=True)
    description = models.TextField('Item description', null=True)
    category = models.CharField('Item category', max_length=1000, null=True, blank=True)
    created_date = models.DateTimeField('date created', auto_now_add=True)
    is_active = models.BooleanField('Item status', default=True)
    transaction_type = models.CharField('Offer type', default='', choices=[('Offer', 'Giver'), ('Request', 'Recipient')], max_length=50)
    cordinates = models.PointField(blank=True, null=True)
    views = models.IntegerField('Number of views', default=0)
    quantity = models.IntegerField('Item quantity', default=0)
    # images
    # is_flagged
    # listing_duration

    

    def __str__(self) :
        return self.name
    class Meta:
        ordering = ['created_date']


# the bid Model will be to the Item model because several bids are made on one Item
# the bid will comprise of item, and users involved with their chats