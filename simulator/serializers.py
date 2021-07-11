from django.db.models import fields
from rest_framework import serializers

from .models import Engineer, Load, LoadProfile, Project, User, Vendor


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'is_vendor',
                  'is_engineer', 'email', 'is_active', 'first_name', 'last_name')

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        user = User.objects.get(pk=representation['user'])
        representation['user'] = UserSerializer(user).data
        return representation


class LoadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Load
        fields = '__all__'


class EngineerSerialiser(serializers.ModelSerializer):
    class Meta:
        model = Engineer
        fields = '__all__'


class LoadProfileSerializer(serializers.ModelSerializer):
    loads = LoadSerializer(many=True, read_only=True)
    class Meta:
        model = LoadProfile
        fields = '__all__'


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'
