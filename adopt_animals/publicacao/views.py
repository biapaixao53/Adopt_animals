# publicacao/views.py
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login, logout
from .models import Animal, Candidatura
from .serializers import AnimalSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework.parsers import MultiPartParser, FormParser

@api_view(['GET'])
def list_animals(request):
    animals = Animal.objects.all()
    serializer = AnimalSerializer(animals, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def animal_detail(request, animals_id):
    animal = Animal.objects.get(pk=animals_id)
    serializer = AnimalSerializer(animal)
    return Response(serializer.data)


@api_view(['POST'])
def signup(request):
    username = request.data.get('username')
    password = request.data.get('password')

    # Verificação se os campos username e password foram fornecidos
    if username is None or password is None:
        return Response({'error': 'invalid username/password'}, status=status.HTTP_400_BAD_REQUEST)

    # Verificação se o username já existe
    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

    # Criação do novo usuário
    user = User.objects.create_user(username=username, password=password)
    login(request, user)

    # Resposta de sucesso
    return Response({'message': f'User {user.username} created successfully'}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({'error': 'Invalid username or password'}, status=status.HTTP_400_BAD_REQUEST)
    # Autenticação do usuário
    user = authenticate(request, username=username, password=password)

    if user is not None:
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'message': 'Logged in successfully',
            'token': token.key  # O LoginModal.js deve guardar este campo
        })
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
def logout_view(request):
    logout(request)
    return Response({'message': 'Logged out successfully'})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@csrf_exempt
def apply_for_animal(request, animals_id):
    try:
        animal = Animal.objects.get(pk=animals_id)
    except Animal.DoesNotExist:
        return Response({'error': 'Animal not found'}, status=status.HTTP_404_NOT_FOUND)

    candidato = request.user  # O usuário logado é o candidato

    # Opcional: Impedir que o responsável do animal se candidate ao próprio animal
    if candidato == animal.responsavel:
        return Response({'error': 'You cannot apply for your own pet'}, status=status.HTTP_400_BAD_REQUEST)

    # Opcional: Verificar se o usuário já se candidatou
    if Candidatura.objects.filter(animal=animal, candidato=candidato).exists():
        return Response({'error': 'You have already applied for this animal'}, status=status.HTTP_400_BAD_REQUEST)

    # Criação da candidatura
    candidatura = Candidatura.objects.create(
        animal=animal,
        candidato=candidato,
        status='pendente'  # O status padrão é 'pendente'
    )

    return Response({'message': 'Application submitted successfully', 'candidatura_id': candidatura.id}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser]) # Necessário para upload de imagens
def create_animal(request):
    serializer = AnimalSerializer(data=request.data)
    if serializer.is_valid():
        # Guarda o animal associando o utilizador logado como responsável
        serializer.save(responsavel=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_pets(request):
    # Filtra animais onde o utilizador logado é o responsável
    pets = Animal.objects.filter(responsavel=request.user)
    serializer = AnimalSerializer(pets, many=True)
    return Response(serializer.data)