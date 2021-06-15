from django.db import models
from django.contrib.auth.models import User
import string
import random
from django.conf import settings
from django.utils import timezone
import pytz

User = settings.AUTH_USER_MODEL

# Create your models here.

class Test(models.Model):
    username = models.CharField(max_length=20, unique = True)
    created_at = models.DateTimeField(auto_now_add=True)

class OGS(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    faculty = models.CharField(max_length=100, blank=True, null=True)
    graduate_unit = models.CharField(max_length=100, blank=True, null=True)
    program = models.CharField(max_length=100, blank=True, null=True)
    research_discipline = models.CharField(max_length=100, blank=True, null=True)
    level_of_study = models.CharField(max_length=50, blank=True, null=True)
    year_of_study = models.IntegerField (blank=True, null=True)
    award_start_session = models.CharField(max_length=50, blank=True, null=True)
    date_of_completion_degree_requirements = models.DateField (blank=True, null=True)
    student_number = models.IntegerField (blank=True, null=True)
    first_name = models.CharField(max_length=50, blank=True, null=True)
    last_name = models.CharField(max_length=50, blank=True, null=True)
    dob = models.DateField (blank=True, null=True)
    email = models.EmailField (max_length = 100, blank=True, null=True)
    phone_number = models.CharField(max_length=50, blank=True, null=True)
    address_line_1 = models.CharField(max_length=100, blank=True, null=True)
    address_line_2 = models.CharField(max_length=100, blank=True, null=True)
    address_city = models.CharField(max_length=100, blank=True, null=True)
    address_province = models.CharField(max_length=100, blank=True, null=True)
    address_country = models.CharField(max_length=100, blank=True, null=True)
    citizenship_status = models.CharField(max_length=50, blank=True, null=True)
    self_identify_indigenous = models.BooleanField(blank=True, null=True)
    self_identify_black = models.BooleanField(blank = True, null = True)

    #academic background seperate table

    current_loan = models.BooleanField(blank=True, null = True)
    vanier = models.IntegerField(blank=True, null = True)
    sshrc = models.IntegerField(blank=True, null = True)
    nserc = models.IntegerField(blank=True, null = True)
    cihr = models.IntegerField(blank=True, null = True)
    ogs = models.IntegerField(blank=True, null = True)
    que2 = models.IntegerField(blank=True, null = True)
    ots = models.IntegerField(blank=True, null = True)
    consider_other = models.BooleanField(blank=True, null = True)

def generate_confirmation_number():
    length = 20
    while True:
        confirmation_number = ''.join(random.choices(string.ascii_lowercase + string.digits, k=length))
        if Payment_Activation.objects.filter(confirmation_number = confirmation_number.count==0):
            break
        return confirmation_number
        

class Payment_Activation(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='payment_activation', to_field="username", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    student_number = models.IntegerField (blank=True, null=True)
    faculty = models.CharField(max_length=200, blank=True, null=True)
    graduate_unit = models.CharField(max_length=200, blank=True, null=True)
    program = models.CharField(max_length=200, blank=True, null=True)
    degree_start_date = models.DateField(blank=True, null=True)
    award = models.CharField(max_length = 200, blank=True, null=True)
    award_duration = models.CharField(max_length = 200, blank=True, null=True)
    type_payment_request = models.CharField(max_length = 200, blank=True, null=True)
    award_start_session = models.CharField(max_length=200, blank=True, null=True)
    submitted = models.BooleanField(blank=True, null = True)
    modified_at = models.DateTimeField(auto_now = True, null = True, blank = True)
    confirmation_number = models.CharField(max_length = 25, default = generate_confirmation_number, unique=True)