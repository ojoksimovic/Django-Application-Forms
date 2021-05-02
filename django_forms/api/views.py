from django.shortcuts import render
from django.shortcuts import render
from rest_framework import generics, status
from .models import Test
from .serializers import TestSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse


class TestView(generics.ListAPIView):
    queryset = Test.objects.all()
    serializer_class = TestSerializer

    def get(self, request, format=None):
        
        return Response({'message': 'Room Retrieved!'}, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        print(request.data.get('username'))
        username = request.data.get('username')
        # if not self.request.username.exists(self.request.username.username):
        #     self.request.username.create()
        return Response({'message': 'Room Joined!'}, status=status.HTTP_200_OK)
