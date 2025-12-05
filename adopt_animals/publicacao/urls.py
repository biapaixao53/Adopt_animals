from django.urls import path
from . import views

urlpatterns = [
    path('api/animals/', views.list_animals, name='list_animals'),
]