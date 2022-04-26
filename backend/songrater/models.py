from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
# Create your models here.
class User(models.Model):
    username = models.CharField(max_length = 255, unique= True, primary_key= True)
    password = models.CharField(max_length = 255)

    def __str__(self):
        return self.username


class Rating(models.Model):
    artist = models.CharField(max_length=255)
    song = models.CharField(max_length= 255, unique=True)
    rating = models.IntegerField(default=1,validators=[MaxValueValidator(5),MinValueValidator(1)])

    def __str__(self):
        return (self.song + " by " + self.artist + "rating: " + str(self.rating))


class BetterRating(models.Model):
    username = models.CharField(max_length = 255, unique= False, primary_key= False)
    artist = models.CharField(max_length=255)
    song = models.CharField(max_length= 255, unique=False)
    rating = models.IntegerField(default=1,validators=[MaxValueValidator(5),MinValueValidator(1)])
    def __str__(self):
        return (self.username + "rated" + self.song + " by " + self.artist + " a " + self.rating + " out of 5")


class Song(models.Model):
    artist = models.CharField(max_length=255)
    song = models.CharField(max_length= 255, unique=False)

    def __str__(self):
        return (self.song + " by " + self.artist)
