from rest_framework import serializers
from .models import Usermaster


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = Usermaster
        fields = ['uid', 'username', 'email', 'age',
                  'phone_number', 'location', 'address']

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
