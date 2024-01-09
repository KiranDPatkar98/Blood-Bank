from rest_framework import serializers
from .models import Usermaster, BloodDonar, BloodRequests


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = Usermaster
        fields = ['uid', 'name', 'username', 'email',
                  'phone_number', 'password']
        extra_kwargs = {'password': {'write_only': True}} 

    def validate(self, attrs):
        if attrs.get('age'):
            age = attrs.get('age')
            if int(age) < 18 or int(age) > 60:
                raise serializers.ValidationError(
                    "Age should be bewtween 18 and 60"
                )

        if attrs.get('phone_number'):
            phone_number = attrs.get('phone_number')
            if (len(phone_number) != 10):
                raise serializers.ValidationError(
                    'Phone number must be exactly 10 characters long'
                )
        return attrs


class BloodDonarSerializer(serializers.ModelSerializer):
    address = serializers.CharField(required=False)

    class Meta:
        model = BloodDonar
        fields = ['uid', 'donar', 'blood_group', 'units',
                  'city', 'address']


class BloodRequestSerializer(serializers.ModelSerializer):

    class Meta:
        model = BloodRequests
        fields = ['uid', 'requestor', 'blood_group', 'units']


class SearchDonarSerializer(serializers.ModelSerializer):
    email = serializers.CharField(source='donar.email')
    phone_number = serializers.CharField(source='donar.phone_number')

    class Meta:
        model = BloodDonar
        fields = ['blood_group', 'city', 'address',
                  'donar', 'phone_number', 'email']


class LoginSerializer(serializers.ModelSerializer):

    username = serializers.CharField(default="username")
    password = serializers.CharField(default="password")

    class Meta(object):
        model = Usermaster
        fields = ['username', 'password']
