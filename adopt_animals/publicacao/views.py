# publicacao/views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Animal
from .serializers import AnimalSerializer

@api_view(['GET'])
def list_animals(request):
    animals = Animal.objects.all()
    serializer = AnimalSerializer(animals, many=True)
    return Response(serializer.data)
