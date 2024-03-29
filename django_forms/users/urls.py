from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from .views import ObtainTokenPairWithColorView, CustomUserCreate, CustomUserEdit, HelloWorldView, UserInfoView, LogoutAndBlacklistRefreshTokenForUserView, GoogleProfileInfoView, ExternalLoginView

urlpatterns = [
    path('blacklist/', LogoutAndBlacklistRefreshTokenForUserView.as_view(), name='blacklist'),
    path('google-profile/', GoogleProfileInfoView.as_view(), name = 'google_profile'),
    path('hello/', HelloWorldView.as_view(), name='hello_world'),
    path('external-login/', ExternalLoginView.as_view(), name = 'google_login'),
    path('token/obtain/', ObtainTokenPairWithColorView.as_view(), name='token_create'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('user-info/', UserInfoView.as_view(), name='user_info'),
    path('user/create/', CustomUserCreate.as_view(), name="create_user"),
    path('user/edit/', CustomUserEdit.as_view(), name="edit_user")
]