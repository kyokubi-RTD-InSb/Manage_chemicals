from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth import get_user_model

from . import models


class ProfileInline(admin.StackedInline):
    model = models.Profile
    can_delete=False

class UserAdmin(BaseUserAdmin):
    list_display = ['username', 'is_active', 'is_admin']
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Permissions', {'fields': ('is_admin', 'is_superuser', 'is_active',)}),
        ('Login Info', {'fields': ('last_login',)})
    )

    add_fieldsets = (
        (None, {'classes': ('wide',),
        'fields': ('username', 'password1', 'password2')}),
    )

    search_fields = ('username',)
    list_filter = ('is_admin',)
    ordering = ('username',)
    inlines = [ProfileInline]

admin.site.register(models.User, UserAdmin)
admin.site.register(models.ChemicalModel)
admin.site.register(models.ChemicalName)
admin.site.register(models.YearAndMonth)
admin.site.register(models.ManageDate)
admin.site.register(models.Profile)
admin.site.register(models.ChemicalShippedFor)
admin.site.unregister(Group)