from django.shortcuts import render
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from .serializer import SearchDonarSerializer, UserSerializer, BloodDonarSerializer, BloodRequestSerializer
from rest_framework import status

from rest_framework.decorators import action
from .models import Usermaster, BloodDonar, BloodRequests
from django.contrib.auth import authenticate
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated


@api_view(['GET'])
def home(request):
    return Response({
        'status': 200,
        'message': "Welcome to the blood bank API's"
    })


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def user(request):

    if (request.method == 'GET'):
        try:
            users = Usermaster.objects.all()
            serializer = UserSerializer(users, many=True)

            return Response(
                {
                    "status": 200,
                    'message': 'Details fetched successfully',
                    'data': serializer.data
                }
            )
        except Exception as e:
            print(e)

    if (request.method == 'POST'):
        """
        API for register the user
        """
        try:
            data = request.data
            serializer = UserSerializer(data=data)
            if serializer.is_valid():
                serializer.save()

                user = Usermaster.objects.get(
                    username=request.data['username'])
                user.set_password(request.data['password'])
                user.save()
            else:
                return Response({
                    'status': 422,
                    'message': serializer.errors,
                }, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
            return Response({
                'status': 200,
                'message': 'User created successfully',
                'data': serializer.data
            })
        except Exception as e:
            print(e)

    if request.method == 'PUT':
        try:
            uid = request.query_params.get('uid')
            data = request.data
            if not uid:
                return Response(
                    {
                        'status': 404,
                        'message': 'UID parameter is required'
                    },
                    status=status.HTTP_404_NOT_FOUND
                )
            try:
                user_obj = Usermaster.objects.get(uid=uid)
            except Exception as e:
                return Response({
                    'status': 404,
                    'message': 'User not found'
                },
                    status=status.HTTP_404_NOT_FOUND
                )
            serializer = UserSerializer(user_obj, data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(
                    {
                        'status': 200,
                        'message': 'User updated successfully',
                        'data': serializer.data
                    }
                )
            else:
                return Response(
                    {
                        'status': 422,
                        'message': 'Invalid data for updating user',
                        'errors': serializer.errors
                    },
                    status=status.HTTP_422_UNPROCESSABLE_ENTITY
                )

        except Exception as e:
            print(e)

    if request.method == 'DELETE':
        try:
            uid = request.query_params.get('uid')
            try:
                user = Usermaster.objects.get(uid=uid)

            except Exception as e:
                return Response(
                    {
                        'status': 404,
                        'message': 'User not found'

                    }, status=status.HTTP_404_NOT_FOUND
                )
            user.delete()
            return Response(
                {
                    'status': 200,
                    'message': 'User deleted successfuly'
                }
            )
        except Exception as e:
            print(e)


@api_view(['POST'])
def login(request):
    data = request.data
    try:
        username = data.get('username')
        password = data.get('password')
        user = authenticate(
            username=username, password=password)

        if user is None:
            return Response({
                'status': status.HTTP_401_UNAUTHORIZED,
                'message': 'Invalid user or password',
            })

        # Generate tokens manually for the user since we have custom user model  and our pk is uid
        refresh = RefreshToken()
        refresh['uid'] = str(user.uid)  # Use the uid as the identifier
        refresh['username'] = user.username
        access_token = refresh.access_token
        refresh_token = str(refresh)

        return Response({
            'status': status.HTTP_200_OK,
            'refresh_token': refresh_token,
            'access_token': str(access_token),
        })

    except Exception as e:
        print(e)


# Blood-Donar
@api_view(['POST'])
# @authentication_classes([JWTAuthentication])
# @permission_classes([IsAuthenticated])
def donate_blood(request):
    try:
        data = request.data
        serializer = BloodDonarSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'status': 200,
                'message': 'Added successfully',
                'data': serializer.data
            })
        else:
            return Response({
                'status': 422,
                'message': str(serializer.errors),
            }, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    except Exception as e:
        return Response(
            {
                'status': 500,
                'message': str(e)

            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Blood-request
@api_view(['POST'])
# @authentication_classes([JWTAuthentication])
# @permission_classes([IsAuthenticated])
def request_blood(request):
    try:
        data = request.data
        serializer = BloodRequestSerializer(data=data)
        if serializer.is_valid():
            # to fetch it from donars
            donors = BloodDonar.objects.all()
            serializer = BloodDonarSerializer(donors, many=True)
            grouped_data = {
                'A+': 0,
                'A-': 0,
                'B+': 0,
                'B-': 0,
                'AB+': 0,
                'AB-': 0,
                'O+': 0,
                'O-': 0

            }
            for donor in serializer.data:
                blood_group = donor['blood_group']
                units = donor['units']
                grouped_data[blood_group] += units

            if grouped_data[data['blood_group']] >= int(data['units']):
                serializer.save()
                return Response({
                    'status': 200,
                    'message': 'Added successfully',
                    'data': serializer.data
                })
            else:
                return Response({"message": "Requested blood group is not available at the moment"}, status=status.HTTP_409_CONFLICT)

        else:
            return Response({
                'status': 422,
                'message': str(serializer.errors),
            }, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    except Exception as e:
        return Response(
            {
                'status': 500,
                'message': str(e)

            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Search- donar
@api_view(['GET'])
# @authentication_classes([JWTAuthentication])
# @permission_classes([IsAuthenticated])
def search_donor(request):
    blood_group = request.GET.get('blood_group')
    city = request.GET.get('city')
    donors = BloodDonar.objects.all()
    try:

        if blood_group:
            donors = donors.filter(blood_group__group=blood_group)
        if city:
            donors = donors.filter(city=city)

        # fetching the donar related data from usermaster table
        donors_with_user_info = donors.select_related('donar')

        serializer = SearchDonarSerializer(donors_with_user_info, many=True)

        return Response({
            'status': status.HTTP_200_OK,
            'message': 'Fetched succesfully',
            'data': serializer.data
        })
    except:
        return Response({
            'status': status.HTTP_404_NOT_FOUND,
            'message': 'Fetched succesfully',

        })


# Blood-inventory


@api_view(['GET'])
def blood_details(request):

    # to fetch it from donars
    donors = BloodDonar.objects.all()
    serializer = BloodDonarSerializer(donors, many=True)
    grouped_data = {
        'A+': 0,
        'A-': 0,
        'B+': 0,
        'B-': 0,
        'AB+': 0,
        'AB-': 0,
        'O+': 0,
        'O-': 0

    }
    for donor in serializer.data:
        blood_group = donor['blood_group']
        units = donor['units']
        grouped_data[blood_group] += units

    # to subtract it from blood-request
    requestor = BloodRequests.objects.all()
    serializer_request = BloodRequestSerializer(requestor, many=True)
    for request_blood in serializer_request.data:
        blood_group = request_blood['blood_group']
        units = request_blood['units']
        grouped_data[blood_group] -= units

    inventory = []
    for key, value in grouped_data.items():
        inventory.append({'bloodGroup': key, 'units': value})

    return Response({
        'status': status.HTTP_200_OK,
        'message': 'Fetched succesfully',
        'data': inventory
    })
