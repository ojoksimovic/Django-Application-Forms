from django.shortcuts import render
from django.contrib.auth import authenticate
from rest_framework import generics, status
from .models import Test, Payment_Activation, OGS
from .serializers import TestSerializer, PaymentActivationSerializer, OGSSerializer, DocumentSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets
from django.http import JsonResponse
from users.models import CustomUser
from users.serializers import CustomUserSerializer
from django.db.models.query_utils import Q


def upload_document(request):
    serializer = DocumentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

class TestView(viewsets.ViewSet):
    queryset = Test.objects.all()
    serializer_class = TestSerializer

    def list(self, request, format=None):
        dataset = Test.objects.all()
        serializer = self.serializer_class(dataset, many=True)
        print(serializer.data)
        
        #check to see if user is logged in!
        print(request.user.is_authenticated)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request, format=None):
        username = request.data.get('username')
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = Test(username=username)
            user.save()
        return Response({'message': 'User Added!'}, status=status.HTTP_200_OK)

class PaymentActivationView(generics.ListAPIView):
    queryset = Payment_Activation.objects.all()
    serializer_class=PaymentActivationSerializer

    def get(self, request, format=None):
        user = request.user
        user_object = CustomUser.objects.get(username = user)
        role = user_object.role
        department = user_object.department

        if role == 'administrator':
            dataset = Payment_Activation.objects.filter(Q(graduate_unit = department)|Q(user=user))
        elif role == 'super administrator':
            dataset = Payment_Activation.objects.all()
        else:
            dataset = Payment_Activation.objects.filter(user = user)
            
        serializer = self.serializer_class(dataset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        serializer = PaymentActivationSerializer(data=request.data, partial=True)
        if serializer.is_valid():
            payment_activation_form = serializer.save()
            if payment_activation_form:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, format=None):
        confirmation_number = request.data.get('confirmation_number')
        print(confirmation_number)
        form_object = Payment_Activation.objects.get(confirmation_number = confirmation_number)
        serializer = PaymentActivationSerializer(form_object, data=request.data, partial=True)
        if serializer.is_valid():
            payment_activation_form = serializer.save()
            if payment_activation_form:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class OGSView(generics.ListAPIView):
    queryset = OGS.objects.all()
    serializer_class=OGSSerializer

    def get(self, request, format=None):
        dataset = OGS.objects.all()
        serializer = self.serializer_class(dataset, many=True)
        print(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        serializer = self.serializer_class(data= request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Application Submitted!'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Application Not Submitted!'}, status=status.status.HTTP_400_BAD_REQUEST)
        
