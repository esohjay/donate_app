from django.contrib.gis.db import models


# Create your models here.
class User(models.Model):
    fname= models.CharField('First name', max_length=50, null=True, blank=True)
    lname= models.CharField('Last name', max_length=50, null=True, blank=True)
    

    def __str__(self) :
        return self.fname


class Item(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField('Item name', max_length=1000, null=True, blank=True)
    description = models.TextField('Item description')
    category = models.CharField('Item category', max_length=1000, null=True, blank=True)
    created_date = models.DateTimeField('date created', auto_now_add=True)
    is_active = models.BooleanField('Item status', default=True)
    transaction_type = models.CharField('Offer type', default='', choices=[('Offer', 'Giver'), ('Request', 'Recipient')], max_length=50)

    

    def __str__(self) :
        return self.name
    class Meta:
        ordering = ['created_date']
