from django.contrib import admin

# Register your models here.

from .models import UserProfile, Item


class ItemInline(admin.StackedInline):
    fieldsets = [
       
        ('Item Details',      {'fields': ('name',( 'category', 'transaction_type'), 'description', )}),
    ]
    model = Item
    extra = 3
    

class ItemAdmin(admin.ModelAdmin):
    fieldsets = [
       
        ('Item Details',      {'fields': ('user', 'name',( 'category', 'transaction_type'), 'description', )}),
        
    ]
    list_display = ('name', 'user', 'transaction_type', 'is_active')
    list_filter = ['created_date']
    search_fields = ['name']
    

class UserAdmin(admin.ModelAdmin):
    fields = ['fname', 'lname']
    inlines = [ItemInline]
    list_display = ('fname', 'lname')
    search_fields = ['fname', 'lname']

admin.site.register(UserProfile, UserAdmin)
admin.site.register(Item, ItemAdmin)