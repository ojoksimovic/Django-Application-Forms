from django.shortcuts import render
from django.shortcuts import render
from rest_framework import generics, status
from .models import Test, Payment_Activation
from .serializers import TestSerializer, PaymentActivationSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets
from django.http import JsonResponse


class TestView(viewsets.ViewSet):
    queryset = Test.objects.all()
    serializer_class = TestSerializer

    def list(self, request, format=None):
        dataset = Test.objects.all()
        serializer = self.serializer_class(dataset, many=True)
        print(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request, format=None):
        # print(request.data.get('username'))
        username = request.data.get('username')
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = Test(username=username)
            user.save()
        return Response({'message': 'Room Joined!'}, status=status.HTTP_200_OK)

# class PaymentActivationView(generics.ListAPIView):
#     queryset = Payment_Activation.objects.all()
#     serializer_class=PaymentActivationSerializer

#     def get
