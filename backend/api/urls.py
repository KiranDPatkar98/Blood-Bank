from django.urls import path
from django.views.generic.base import RedirectView
from .views import get_users, create_user, update_user, delete_user, login, donate_blood, request_blood, search_donor, blood_details, check_authentication


urlpatterns = [
    path('', RedirectView.as_view(url='/docs/', permanent=False)),
    path('create-user/', create_user, name='create_user'),
    path('update-user/', update_user, name='update_user'),
    path('get-users/', get_users, name='get_user'),
    path('delete-user/', delete_user, name='delete_user'),
    path('login/', login, name='login'),
    path('donate-blood/', donate_blood, name="Blood donation"),
    path('request-blood/', request_blood, name="Blood request"),
    path('search-donor/', search_donor, name='Search donor'),
    path('blood-inventory/', blood_details, name='blood_details'),
    path('check-auth/', check_authentication, name='check_authentication')


]
