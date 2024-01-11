from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from .serializer import SearchDonorSerializer, UserSerializer, UserUpdateSerializer, BloodDonorSerializer, BloodRequestSerializer, LoginSerializer
from rest_framework import status

from rest_framework.decorators import action
from .models import Usermaster, BloodDonor, BloodRequests
from django.contrib.auth import authenticate
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema, OpenApiParameter


@extend_schema(
    request=UserSerializer,
    responses=UserSerializer,
    tags=['User'],
    description="API for fetching user details"
)
@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def get_users(request):
    if not request.user.is_authenticated:
        return Response(
            {
                'status': status.HTTP_401_UNAUTHORIZED,
                'message': 'Unauthorized: Invalid or missing token'
            },
            status=status.HTTP_401_UNAUTHORIZED
        )
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


@extend_schema(
    request=UserSerializer,
    responses=UserSerializer,
    tags=['User'],
    description="Create a new user"
)
@api_view(['POST'])
def create_user(request):
    try:
        data = request.data
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            username = Usermaster.objects.filter(
                username=request.data['username']).exists()
            useremail = Usermaster.objects.filter(
                email=request.data['email']).exists()
            if username:
                return Response({"message": "Username already exists"}, status=status.HTTP_409_CONFLICT)
            elif useremail:
                return Response({"message": "email already exists"}, status=status.HTTP_409_CONFLICT)
            serializer.save()

            user = Usermaster.objects.get(
                username=request.data['username'])
            user.set_password(request.data['password'])
            user.save()
            return Response({
                'status': 200,
                'message': 'User created successfully',
                'data': serializer.data
            })

        else:
            return Response({
                'status': 422,
                'message': 'UNPROCESSABLE_ENTITY',
                'info': str(serializer.errors),
            }, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    except Exception as e:
        print(e)


@extend_schema(
    request=UserUpdateSerializer,
    responses=UserSerializer,
    tags=['User'],
    description="Update a user",
    parameters=[
        OpenApiParameter(name='uid', description='uid',
                         required=True, type=str),
    ]
)
@api_view(['PUT'])
def update_user(request):
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
        serializer = UserUpdateSerializer(user_obj, data=data)
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


@extend_schema(
    request=UserSerializer,
    responses=UserSerializer,
    tags=['User'],
    description="Delete a user",
    parameters=[
        OpenApiParameter(name='uid', description='uid',
                         required=True, type=str),
    ]
)
@api_view(['DELETE'])
def delete_user(request):
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


@extend_schema(
    request=LoginSerializer,
    responses=UserSerializer,
    tags=['Login'],
    description="API for Login"
)
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
            }, status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(user)
        if user.is_superuser:
            # User is a superuser
            return Response({'is_superuser': True,  'status': status.HTTP_200_OK,
                             'refresh_token': str(refresh),
                             'access_token': str(refresh.access_token)}, status=status.HTTP_200_OK)
        else:
            # User is not a superuser
            return Response({'is_superuser': False,  'status': status.HTTP_200_OK,
                             'refresh_token': str(refresh),
                             'access_token': str(refresh.access_token), }, status=status.HTTP_200_OK)

    except Exception as e:
        print(e)


# Blood-Donor
@extend_schema(
    request=BloodDonorSerializer,
    responses=BloodDonorSerializer,
    tags=['Blood donor'],
    description="API for blood donation"
)
@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def donate_blood(request):
    try:
        data = request.data
        serializer = BloodDonorSerializer(data=data)
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
@extend_schema(
    request=BloodRequestSerializer,
    responses=BloodRequestSerializer,
    tags=['Blood request'],
    description="API for blood request"
)
@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def request_blood(request):
    try:
        data = request.data
        serializer = BloodRequestSerializer(data=data)
        if serializer.is_valid():
            # to fetch it from donors
            donors = BloodDonor.objects.all()
            donor_serializer = BloodDonorSerializer(donors, many=True)
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
            for donor in donor_serializer.data:
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


# Search- donor
@extend_schema(
    request=SearchDonorSerializer,
    responses=SearchDonorSerializer,
    tags=['Search donor'],
    description="API for donor search",
    parameters=[
        OpenApiParameter(name='blood_group', description='blood_group',
                         required=True, type=str),
        OpenApiParameter(name='city', description='city',
                         required=True, type=str),
    ]
)
@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def search_donor(request):
    blood_group = request.GET.get('blood_group')
    city = request.GET.get('city')
    donors = BloodDonor.objects.all()
    try:

        if blood_group:
            donors = donors.filter(blood_group__group=blood_group)
        if city:
            donors = donors.filter(city=city)

        # fetching the donor related data from usermaster table
        donors_with_user_info = donors.select_related('donar')

        serializer = SearchDonorSerializer(donors_with_user_info, many=True)

        return Response({
            'status': status.HTTP_200_OK,
            'message': 'Fetched succesfully',
            'data': serializer.data
        })
    except:
        return Response({
            'status': status.HTTP_404_NOT_FOUND,
            'message': 'Not found',
        })


# Blood-inventory

@extend_schema(
    tags=['Blood inventory'],
    description="API for blood inventory"
)
@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def blood_details(request):

    # to fetch it from donors
    donors = BloodDonor.objects.all()
    serializer = BloodDonorSerializer(donors, many=True)
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


@api_view(['GET'])
def check_authentication(request):
    try:
        print(request.user.is_authenticated, 'hi')
        if request.user.is_authenticated:
            return Response({'authenticated': True}, status=status.HTTP_200_OK)
        else:
            return Response({'authenticated': False}, status=status.HTTP_401_UNAUTHORIZED)

    except:
        return Response({'authenticated': False}, status=status.HTTP_401_UNAUTHORIZED)
