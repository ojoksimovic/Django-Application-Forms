from django.urls import path, include
# from .views import TestView

urlpatterns = [
    path('', include('django.contrib.auth.urls')),
    ]