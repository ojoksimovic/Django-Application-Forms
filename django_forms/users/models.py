from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    first_name = models.CharField(blank=True, max_length=100)
    last_name = models.CharField(blank=True, max_length=100)
    department = models.CharField(blank=True, max_length=100)
    role = models.CharField(blank=True, max_length=100)
    external_id = models.CharField(blank=True, max_length=100)
    external_type = models.CharField(blank=True, max_length=100)