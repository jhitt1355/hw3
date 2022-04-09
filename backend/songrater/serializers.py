from rest_framework import serializers
from .models import User, Artist

# The serializer translates a Todo object into a format that
# can be stored in our database. We use the Todo model.
class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    # The id is automatically created as a primary key by our Django model
    # and we can included it here as well.
    fields = ('username', 'password')

class ArtistSerializer(serializers.ModelSerializer):
  class Meta:
    model = Artist
    # The id is automatically created as a primary key by our Django model
    # and we can included it here as well.
    fields = ('artist', 'song')