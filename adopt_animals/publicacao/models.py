from django.db import models
from django.contrib.auth.models import User

class Animal(models.Model):
    nome = models.CharField(max_length=100)
    especie = models.CharField(max_length=100)
    raca = models.CharField(max_length=100, default='Desconhecido')
    idade = models.IntegerField()
    tamanho = models.CharField(max_length=50)
    descricao = models.TextField()
    foto = models.ImageField(upload_to='media/')
    responsavel = models.ForeignKey(User, on_delete=models.CASCADE)  # Relacionamento com o responsável
    data_publicacao = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nome

class Mensagem(models.Model):
    remetente = models.ForeignKey(User, related_name='remetente', on_delete=models.CASCADE)
    destinatario = models.ForeignKey(User, related_name='destinatario', on_delete=models.CASCADE)
    conteudo = models.TextField()
    data_envio = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Mensagem de {self.remetente} para {self.destinatario}'


class Favorito(models.Model):
    animal = models.ForeignKey(Animal, on_delete=models.CASCADE)
    utilizador = models.ForeignKey(User, on_delete=models.CASCADE)
    data_favorito = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.utilizador} favorito de {self.animal}'


class Candidatura(models.Model):
    STATUS_CHOICES = [
        ('pendente', 'Pendente'),
        ('aceite', 'Aceite'),
        ('recusada', 'Recusada'),
    ]
    animal = models.ForeignKey(Animal, on_delete=models.CASCADE)
    candidato = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pendente')
    data_candidatura = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.candidato} para {self.animal}'




