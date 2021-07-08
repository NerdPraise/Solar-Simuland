from typing import List
from simulator.models import Load, LoadProfile, Project, Vendor
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, ListCreateAPIView
from rest_framework.response import Response
from rest_framework import serializers, status, permissions


from .serializers import LoadSerializer, ProjectSerializer, UserSerializer, VendorSerializer


class UserCreateView(CreateAPIView):
    serializer_class = UserSerializer


class VendorListView(ListCreateAPIView):
    serializer_class = VendorSerializer
    queryset = Vendor.objects.all()


class LoadListCreateView(ListCreateAPIView):
    serializer_class = LoadSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        return Load.objects.filter(load_profile=LoadProfile.objects.get(user=1))

    def post(self, request, *args, **kwargs):
        data = request.data

        load_data = data.pop('load_data')
        if isinstance(data, list):
            serializer = self.serializer_class(data=data, many=True)
        else:
            serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProjectListCreateView(ListCreateAPIView):
    serializer_class = ProjectSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        return Project.objects.filter(user=user.id)

    def post(self, request, *args, **kwargs):
        data = request.data
        user = self.request.user
        load_profile = LoadProfile.objects.create(name="Ose", user=user)
        data['load_profile'] = load_profile.id
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
