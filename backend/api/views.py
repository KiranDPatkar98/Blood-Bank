from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import UserSerializer
from rest_framework import status
from rest_framework import viewsets
from rest_framework.decorators import action
from .models import Usermaster

# Create your views here.


@api_view(['GET'])
def home(request):
    return Response({
        'status': 200,
        'message': 'This is your first api'
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
            print(uid)
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

# class UserViewSet(viewsets.ModelViewSet):
#     """
#     A simple viewset for create, fetch, delete, and update
#     """

#     queryset = Usermaster.objects.all()
#     serializer_class = UserSerializer

#     @action(detail=False, methods=['POST'])
#     def create_user(self, request):
#         try:
#             data = request.data
#             serializer = UserSerializer(data=data)
#             # This raises a ValidationError if data is invalid
#             serializer.is_valid(raise_exception=True)
#             serializer.save()

#             return Response({
#                 'status': 200,
#                 'message': 'User created successfully',
#                 'data': serializer.data
#             })

#         except Exception as e:
#             print('iam inside except')
#             return Response({
#                 'status': 422,
#                 # Return the exception message for debugging
#                 'message': str(e),
#             }, status=status.HTTP_422_UNPROCESSABLE_ENTITY)