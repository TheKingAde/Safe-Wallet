from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'wallet_address', 'mnemonic_phrase', 'is_staff', 'is_active')
    search_fields = ('username', 'email', 'wallet_address', 'mnemonic_phrase')

    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('email', 'wallet_address', 'mnemonic_phrase')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'wallet_address', 'mnemonic_phrase', 'password1', 'password2'),
        }),
    )

    ordering = ('username',)

admin.site.register(CustomUser, CustomUserAdmin)
