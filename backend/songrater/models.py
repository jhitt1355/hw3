from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length = 255, unique= True, primary_key= True)
    password = models.CharField(max_length = 255)

    def __str__(self):
        return self.username

class Rating(models.Model):
    artist = models.CharField(max_length=255)
    song = models.CharField(max_length= 255, primary_key= True, unique=True)
    rating = models.CharField(max_length= 255)

    def __str__(self):
        return (self.song + " by " + self.artist)

