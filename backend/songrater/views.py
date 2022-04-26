

# Create your views here.
from django.shortcuts import render
from rest_framework import viewsets # We use a viewset.
from .serializers import UserSerializer, RatingSerializer, SongSerializer, BetterRatingSerializer# Import our serializer file.
from .models import Song, User, Rating, BetterRating # Import our Todo model.

# Our Todo view.
class UserView(viewsets.ModelViewSet):
  
  serializer_class = UserSerializer
  # Todo.objects.all() retrieves all the Todo objects in the database.
  queryset = User.objects.all()

class RatingView(viewsets.ModelViewSet):
  
  serializer_class = RatingSerializer
  # Todo.objects.all() retrieves all the Todo objects in the database.
  queryset = Rating.objects.all()

class BetterRatingView(viewsets.ModelViewSet):
  
  serializer_class = BetterRatingSerializer
  # Todo.objects.all() retrieves all the Todo objects in the database.
  queryset = BetterRating.objects.all()

class SongView(viewsets.ModelViewSet):
  
  serializer_class = SongSerializer
  # Todo.objects.all() retrieves all the Todo objects in the database.
  queryset = Song.objects.all()