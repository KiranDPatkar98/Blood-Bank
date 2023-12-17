from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import SearchDonarSerializer, UserSerializer, BloodDonarSerializer, BloodRequestSerializer
from rest_framework import status
from rest_framework import viewsets
from rest_framework.decorators import action
from .models import Usermaster, BloodDonar
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken


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
        try:
            data = request.data
            serializer = UserSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response({
                    'status': 200,
                    'message': 'User created successfully',
                    'data': serializer.data
                })
            else:
                return Response({
                    'status': 422,
                    'message': serializer.errors,
                }, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
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
        print(user)
        if user is None:
            return Response({
                'status': 401,
                'message': 'Invalid user or password',
            })

        refresh = RefreshToken.for_user(user)

        return {
            'status': 200,
            'refresh_token': str(refresh),
            'access_token': str(refresh.access_token),
        }

    except Exception as e:
        print(e)


# Blood-Donar
@api_view(['POST'])
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
                'message': 'Something went wrong'

            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Blood-request
@api_view(['POST'])
def request_blood(request):
    try:
        data = request.data
        print(data)
        serializer = BloodRequestSerializer(data=data)
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


# Search- donar
@api_view(['GET'])
def search_donor(request):
    blood_group = request.GET.get('blood_group')
    city = request.GET.get('city')
    donors = BloodDonar.objects.all()

    if blood_group:
        donors = donors.filter(blood_group__group=blood_group)
    if city:
        donors = donors.filter(city=city)

    # fetching the donar related data from usermaster table
    donors_with_user_info = donors.select_related('donar')

    serializer = SearchDonarSerializer(donors_with_user_info, many=True)

    return Response({
        'status': 200,
        'message': 'Fetched succesfully',
        'data': serializer.data
    })
