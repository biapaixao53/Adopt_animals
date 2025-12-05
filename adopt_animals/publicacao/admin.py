from django.contrib import admin
from .models import Animal, Candidatura, Mensagem, Favorito

admin.site.register(Animal)
admin.site.register(Candidatura)
admin.site.register(Mensagem)
admin.site.register(Favorito)