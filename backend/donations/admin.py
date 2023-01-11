from django.contrib import admin

# Register your models here.

from .models import  Item
from django.contrib.auth import get_user_model
from authemail.admin import EmailUserAdmin

# class ItemInline(admin.StackedInline):
#     fieldsets = (
       
#         ('Item Details',      {'fields': ('name',( 'category', 'transaction_type'), 'description', )}),
#     )
#     model = Item
#     extra = 3
    

class ItemAdmin(admin.ModelAdmin):
    fieldsets = [
       
        ('Item Details',      {'fields': ('user', 'name',( 'category', 'transaction_type'), 'description', )}),
        
    ]
    list_display = ('name', 'user', 'transaction_type', 'is_active')
    list_filter = ['created_date']
    search_fields = ['name']
    

class UserAdmins(EmailUserAdmin):
    fieldsets = (
		(None, {'fields': ('email', 'password')}),
		('Personal Info', {'fields': ('first_name', 'last_name')}),
		('Permissions', {'fields': ('is_active', 'is_staff', 
									   'is_superuser', 'is_verified', 
									   'groups', 'user_permissions')}),
		('Important dates', {'fields': ('last_login', 'date_joined')}),
		
	)
    # inlines = [ItemInline]
    # list_display = ('fname', 'lname')
    # search_fields = ['fname', 'lname']
    

# admin.site.unregister(User)

# admin.site.register(UserProfile, UserAdmins)
admin.site.unregister(get_user_model())
admin.site.register(get_user_model(), UserAdmins)
admin.site.register(Item, ItemAdmin)