from rest_framework import serializers
from .models import Usermaster, BloodDonar, BloodRequests


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = Usermaster
        fields = ['uid', 'name', 'username', 'email',
                  'phone_number']

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
    description = serializers.CharField(required=False)

    class Meta:
        model = BloodDonar
        fields = ['uid', 'donar', 'blood_group', 'units',
                  'body_weight', 'accepted', 'description']


class BloodRequestSerializer(serializers.ModelSerializer):

    class Meta:
        model = BloodRequests
        fields = ['uid', 'requestor', 'blood_group', 'units']
