from django.urls import path
from . import views


urlpatterns = [
    path('api/animals/', views.list_animals, name='list_animals'),
    path('api/animals/<int:animals_id>', views.animal_detail, name='animal_detail'),
    path('api/signup/', views.signup, name='signup'),
    path('api/login/', views.login_view, name='login_view'),
    path('api/logout/', views.logout_view, name='logout_view'),
    path('api/animals/<int:animals_id>/apply/', views.apply_for_animal, name='apply_for_animal'),
    path('api/publish/', views.create_animal, name='create_animal'),

]