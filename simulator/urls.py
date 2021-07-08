from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import LoadListCreateView, ProjectListCreateView, UserCreateView, VendorListView
urlpatterns = [
    # Login Routes
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Users
    path('user/create/', UserCreateView.as_view(), name='user-creation'),

    # Vendors
    path('vendors/', VendorListView.as_view(), name='vendor-list-create'),

    # Load
    path('loads/', LoadListCreateView.as_view(), name='load-list-create'),

    # Project
    path('projects/', ProjectListCreateView.as_view(), name='project-list-create'),
]
