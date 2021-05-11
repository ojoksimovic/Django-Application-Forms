from rest_framework import serializers
from .models import Test, Payment_Activation

class TestSerializer(serializers.ModelSerializer):
  class Meta:
      model = Test
      fields = ('id','username', 'created_at')

class PaymentActivationSerializer(serializers.ModelSerializer):
  class Meta:
      model = Payment_Activation
      fields = '__all__'