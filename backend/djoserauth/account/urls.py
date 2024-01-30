from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet
router= DefaultRouter()
router.register('user',viewset=UserViewSet,basename='user')

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('',include(router.urls)),
    path('users/google_save/', UserViewSet.as_view({'post': 'google_save_data'}), name='user-google-save'),
    path('users/otp_login/', UserViewSet.as_view({'post': 'otp_login'}), name='otp_login'),
    path('users/verify_email/', UserViewSet.as_view({'post': 'verify_email'}), name='verify_email'),
    path('rest-auth',include('rest_framework.urls'))
]