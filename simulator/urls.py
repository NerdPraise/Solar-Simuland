from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import (
    LoadListCreateView, LoadProfileListView,
    ProjectListCreateView, LoadProfileRetrieveView,
    SolarModelsGetView, SolarModelsRetrieveView, UserCreateView, VendorListView
)
urlpatterns = [
    # Login Routes
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Users
    path('user/create/', UserCreateView.as_view(), name='user-creation'),

    # Vendors
    path('vendors/', VendorListView.as_view(), name='vendor-list-create'),

    # Load
    path('loads/<load_profile_pk>',
         LoadListCreateView.as_view(), name='load-list-create'),

    # Project
    path('projects/', ProjectListCreateView.as_view(), name='project-list-create'),
    path('loadprofile/<int:pk>/', LoadProfileRetrieveView.as_view(),
         name='project-retrieve'),

    # Load Profile
    path('loadprofile/', LoadProfileListView.as_view(), name='list-loadprofile'),

    # Solar Models
    path('solar_models/', SolarModelsGetView.as_view(), name="list-models"),
    path('solar_models/<int:pk>',
         SolarModelsRetrieveView.as_view(), name="get-models"),
]
