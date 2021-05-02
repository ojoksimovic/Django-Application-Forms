from django.db import models

# Create your models here.

class Test(models.Model):
    username = models.CharField(max_length=20, unique = True)
    created_at = models.DateTimeField(auto_now_add=True)
