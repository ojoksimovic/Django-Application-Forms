from rest_framework import serializers
from .models import Test, Payment_Activation, OGS, Document

class TestSerializer(serializers.ModelSerializer):
  class Meta:
      model = Test
      fields = ('id', 'username', 'created_at')

class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ('id', 'name', 'form')

class DocumentUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = '__all__'

class PaymentActivationSerializer(serializers.HyperlinkedModelSerializer):
  first_name = serializers.CharField(read_only=True, source='user.first_name')
  last_name = serializers.CharField(read_only=True, source='user.last_name')
  email = serializers.CharField(read_only=True, source='user.email')
  documents = DocumentSerializer(many=True)

  class Meta:
      model = Payment_Activation
      fields = ('user', 'first_name', 'last_name', 'email', 'created_at', 'student_number', 'faculty', 'graduate_unit', 'program', 'degree_start_date', 'award', 'award_duration', 'type_payment_request', 'award_start_session', 'submitted', 'submitted_at', 'modified_at',
                'confirmation_number', 'admin_research_requirement', 'admin_matching_portion', 'admin_utf', 'admin_departmental_award', 'admin_ta', 'admin_ra', 'admin_other_source', 'admin_payment_notes', 'admin_award_letter_notes', 'admin_user', 'admin_submitted', 'admin_submitted_at', 'admin_confirmation_number', 'award_letter', 'documents')

class OGSSerializer(serializers.ModelSerializer):
    class Meta:
      model = OGS
      fields = '__all__'
