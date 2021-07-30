from typing import List
from simulator.models import Load, LoadProfile, Project, SolarModel, Vendor
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, ListAPIView, ListCreateAPIView, RetrieveAPIView, RetrieveUpdateAPIView, UpdateAPIView
from rest_framework.response import Response
from rest_framework import status, permissions


from .serializers import(
    EngineerSerialiser, LoadProfileSerializer, LoadSerializer,
    ProjectSerializer, SolarModelsSerializer, UserSerializer,
    VendorSerializer
)


class UserCreateView(CreateAPIView):
    serializer_class = UserSerializer


class VendorListView(ListCreateAPIView):
    serializer_class = VendorSerializer
    queryset = Vendor.objects.all()


class LoadListCreateView(ListCreateAPIView):
    serializer_class = LoadSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self, load_profile_pk):
        user = self.request.user
        return Load.objects.filter(load_profile__user=user.id, load_profile=load_profile_pk)

    def get(self, request, *args, **kwargs):
        load_profile_pk = kwargs['load_profile_pk']
        queryset = self.get_queryset(load_profile_pk)

        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        data = request.data

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
        # TO create a priject, a loadprofile should exist
        data = request.data
        user = self.request.user
        load_profile = LoadProfile.objects.create(name="Ose", user=user)
        data['load_profile'] = load_profile.id
        data['user'] = user.id
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoadProfileRetrieveView(RetrieveAPIView):
    serializer_class = LoadProfileSerializer
    permission_classes = (permissions.IsAuthenticated,)
    queryset = LoadProfile.objects.all()


class LoadProfileListView(ListAPIView):
    serializer_class = LoadProfileSerializer
    queryset = LoadProfile.objects.all()


class EngineerCreateView(CreateAPIView):
    serializer_class = EngineerSerialiser


class EngineerRetrieveUpdateView(RetrieveUpdateAPIView):
    serializer_class = EngineerSerialiser


class SolarModelsGetView(ListAPIView):
    serializer_class = SolarModelsSerializer
    queryset = SolarModel.objects.all()


class SolarModelsRetrieveView(RetrieveAPIView):
    serializer_class = SolarModelsSerializer
    queryset = SolarModel.objects.all()
