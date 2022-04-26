from rest_framework import serializers
from .models import User, Rating, Song, BetterRating

# The serializer translates a Todo object into a format that
# can be stored in our database. We use the Todo model.
class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    # The id is automatically created as a primary key by our Django model
    # and we can included it here as well.
    fields = ('username', 'password')

class RatingSerializer(serializers.ModelSerializer):
  class Meta:
    model = Rating
    # The id is automatically created as a primary key by our Django model
    # and we can included it here as well.
    fields = ('id','artist', 'song', 'rating')

class BetterRatingSerializer(serializers.ModelSerializer):
  class Meta:
    model = BetterRating
    fields = ('id','username','artist', 'song','rating')


class SongSerializer(serializers.ModelSerializer):
  class Meta:
    model = Song
    # The id is automatically created as a primary key by our Django model
    # and we can included it here as well.
    fields = ('id','artist', 'song')
