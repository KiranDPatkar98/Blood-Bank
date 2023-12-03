from django.urls import path
from .views import home, user
from rest_framework.routers import DefaultRouter

# router = DefaultRouter()
# router.register(r'users', UserViewSet, basename='UserViewSet')


urlpatterns = [
    path('', home, name='home'),
    path('users/', user, name='user'),
]

# urlpatterns += router.urls
