from rest_framework import serializers
from .models import Test, Payment_Activation

class TestSerializer(serializers.ModelSerializer):
  class Meta:
      model = Test
      fields = ('id','username', 'created_at')

class PaymentActivationSerializer(serializers.ModelSerializer):
  class Meta:
      model = Payment_Activation
      fields = ('id', 'user', 'created_at', 'faculty', 'graduate_unit', 'program', 'degree_start_date', 'award', 'award_duration', 'type_payment_request', 'award_start_session', 'submitted', 'submitted_at', 'confirmation_number')
      extra_kwargs = {'id': {"read_only": False, 'required': False}}