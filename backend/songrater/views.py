

# Create your views here.
from django.shortcuts import render
from rest_framework import viewsets # We use a viewset.
from .serializers import UserSerializer, ArtistSerializer # Import our serializer file.
from .models import User, Artist # Import our Todo model.

# Our Todo view.
class UserView(viewsets.ModelViewSet):
  
  serializer_class = UserSerializer
  # Todo.objects.all() retrieves all the Todo objects in the database.
  queryset = User.objects.all()

class ArtistView(viewsets.ModelViewSet):
  
  serializer_class = ArtistSerializer
  # Todo.objects.all() retrieves all the Todo objects in the database.
  queryset = Artist.objects.all()