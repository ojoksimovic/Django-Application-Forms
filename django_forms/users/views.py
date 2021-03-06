from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import CustomUser
import requests

from .serializers import MyTokenObtainPairSerializer, CustomUserSerializer

class ObtainTokenPairWithColorView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    
    def get(self, request):
        return Response((), status=status.HTTP_200_OK)

class CustomUserCreate(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()


    def post(self, request, format='json'):
        serializer = CustomUserSerializer(data=request.data, partial= True)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CustomUserEdit(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def patch(self, request, format=None):
        username = request.data.get('username')
        user_object = CustomUser.objects.get(username = username)
        serializer = CustomUserSerializer(user_object, data=request.data, partial= True)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class HelloWorldView(APIView):
    serializer_class = CustomUserSerializer

    def get(self, request):
        return Response(data={"hello":"world"}, status=status.HTTP_200_OK)

class UserInfoView(APIView):
    serializer_class = CustomUserSerializer
    
    def get(self, request):
        user = request.user
        dataset = CustomUser.objects.filter(username = user)
        serializer = self.serializer_class(dataset, many=True)
        return Response(data = serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        user = request.user
        dataset = CustomUser.objects.filter(username = user)
        serializer = self.serializer_class(dataset, many=True)
        return Response(data = serializer.data, status=status.HTTP_200_OK)


class LogoutAndBlacklistRefreshTokenForUserView(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
