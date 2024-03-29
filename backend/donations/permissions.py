from rest_framework import permissions


class AllowOwner(permissions.BasePermission):

    #  def has_permission(self, request, view):
    #     if request.user.is_authenticated:
    #        return True

    def has_object_permission(self, request, view, obj):
        if request.user.is_superuser:
            return True

        if request.method in permissions.SAFE_METHODS:
            return True

        if obj.uid == request.user.uid:
            return True

        

        return False