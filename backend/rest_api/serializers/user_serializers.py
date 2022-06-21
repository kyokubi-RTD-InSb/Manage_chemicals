from rest_framework import serializers

from .. import models

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    last_login = serializers.DateTimeField(format='%Y/%m/%d-%H:%M:%S', read_only=True)

    class Meta:
        model = models.User
        exclude = ['groups', 'user_permissions']
    
    def create(self, validated_data):
        user = models.User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user

class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Profile
        fields = '__all__'
