from django.contrib import admin
from .models import User, Rating, Song

# Register your models here.
class RatingAdmin(admin.ModelAdmin):
    list_display = ("artist", "song", "rating")


admin.site.register(Rating, RatingAdmin)
