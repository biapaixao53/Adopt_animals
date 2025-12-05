# publicacao/serializers.py
from rest_framework import serializers
from .models import Animal

class AnimalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Animal
        fields = ['id', 'nome', 'especie', 'raca', 'idade', 'tamanho', 'descricao', 'foto', 'responsavel']
