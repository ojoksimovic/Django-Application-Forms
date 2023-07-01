from django.shortcuts import render, get_object_or_404
from django.contrib.auth import authenticate
from django.http import HttpResponse, HttpResponseNotFound
from django.conf import settings
from rest_framework import generics, status
from rest_framework.decorators import api_view
from .models import Test, Payment_Activation, OGS, Document
from .serializers import TestSerializer, PaymentActivationSerializer, OGSSerializer, DocumentSerializer, DocumentUploadSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets
from django.http import JsonResponse
from users.models import CustomUser
from users.serializers import CustomUserSerializer
from django.db.models.query_utils import Q
import os
import openai
import socket

class DocumentView(generics.RetrieveAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer

    def get(self, request, *args, **kwargs):
        document = self.get_object()

        if document.file:
            with open(document.file.path, 'rb') as f:
                file_data = f.read()
            response = HttpResponse(file_data, content_type='application/pdf')
            response['Content-Disposition'] = f'attachment; filename="{document.name}"'
            return response
            
        return HttpResponseNotFound({'error': 'File does not exist'}, status=status.HTTP_404_NOT_FOUND)

    def delete (self, request, *args, **kwargs):
        document = self.get_object()
        if document.file:
            document.delete()
            return Response(status = status.HTTP_204_NO_CONTENT)
        
        return HttpResponseNotFound({'error': 'File does not exist'}, status=status.HTTP_404_NOT_FOUND)


class TestView(viewsets.ViewSet):
    queryset = Test.objects.all()
    serializer_class = TestSerializer

    def list(self, request, format=None):
        dataset = Test.objects.all()
        serializer = self.serializer_class(dataset, many=True)        
        #check to see if user is logged in!
        # print(request.user.is_authenticated)
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
        form_serializer = PaymentActivationSerializer(data=request.data, partial=True)
        if form_serializer.is_valid():
            payment_activation_form = form_serializer.save()
        
            for document in request.data.getlist('documents'):
                document_serializer=DocumentUploadSerializer(data={
            'form': payment_activation_form.pk,
            'name': document.name,
            'file': document
                })
                if document_serializer.is_valid():
                    document_serializer.save()
    
            if payment_activation_form:
                json = form_serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(form_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, format=None):
        dataset=request.data
        confirmation_number = request.data.get('confirmation_number')
        form_object = Payment_Activation.objects.get(confirmation_number = confirmation_number)
        form_serializer = PaymentActivationSerializer(form_object, data=dataset, partial=True)
        if form_serializer.is_valid():
            payment_activation_form = form_serializer.save()

            if request.data.get('admin_submitted'):
                # add award_letter to form entry once admin submitted form
                award_letter = get_award_letter(form_object)
                award_letter_serializer = PaymentActivationSerializer(form_object, data={'award_letter': award_letter}, partial=True)
                if award_letter_serializer.is_valid():
                    payment_activation_form = award_letter_serializer.save()

            if request.data.get('documents'):
                for document in request.data.getlist('documents'):
                    document_serializer=DocumentUploadSerializer(data={
                'form': payment_activation_form.pk,
                'name': document.name,
                'file': document
                    })
                    if document_serializer.is_valid():
                        document_serializer.save()

            if payment_activation_form:
                json = form_serializer.data
                return Response(json, status=status.HTTP_200_OK)
        return Response(form_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
def get_award_letter(form):
    timeout = 30  #timeout value in seconds
    socket.setdefaulttimeout(timeout)
    openai.api_key = settings.OPENAI_API_KEY
    response = openai.Completion.create(
    model= "text-davinci-003",
    prompt= f"Write an award letter for a student named {form.user.first_name} {form.user.last_name} from the department of {form.graduate_unit} receiving the {form.award} {form.award_duration} award. The letter should be written from the 'University of Mock' and indicate the student is taking up the award from {form.award_start_session}. Include the end date and the dollar amount of the award. Include the following additional information: {form.admin_award_letter_notes}. Do not include any placeholders in brackets, as the response will be the final version of the letter.",
    max_tokens= 500,
    frequency_penalty= 0.2,
    presence_penalty= 1.0
    )
    generated_text = response.choices[0].text
    return generated_text

class OGSView(generics.ListAPIView):
    queryset = OGS.objects.all()
    serializer_class=OGSSerializer

    def get(self, request, format=None):
        dataset = OGS.objects.all()
        serializer = self.serializer_class(dataset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        serializer = self.serializer_class(data= request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Application Submitted!'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Application Not Submitted!'}, status=status.status.HTTP_400_BAD_REQUEST)
        

        #TO DO: FIGURE OUT WHY CONNECTION ERROR HAPPENING. MAYBE SOMETHING IS CALLING THE FUNCTION MULTIPLE TIMES..CAN ADD ASYNC OPTION?