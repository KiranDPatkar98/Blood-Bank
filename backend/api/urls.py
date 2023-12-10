from django.urls import path
from .views import home, user, login, donate_blood, request_blood
from rest_framework.routers import DefaultRouter

# router = DefaultRouter()
# router.register(r'users', UserViewSet, basename='UserViewSet')


urlpatterns = [
    path('', home, name='home'),
    path('users/', user, name='user'),
    path('login/', login, name='login'),
    path('donate-blood/', donate_blood, name="Blood donation"),
    path('request-blood/', request_blood, name="Blood request")
]

# urlpatterns += router.urls
