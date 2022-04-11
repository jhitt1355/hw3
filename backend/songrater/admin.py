from django.contrib import admin
from .models import User, Artist
# Register your models here.

class UserAdmin(admin.ModelAdmin):
    list_display=('username','password')

class ArtistAdmin(admin.ModelAdmin):
    list_display=('artist','song')

admin.site.register(User, UserAdmin)
admin.site.register(Artist, ArtistAdmin)
