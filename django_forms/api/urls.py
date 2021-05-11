from django.urls import path
from .views import TestView, PaymentActivationView

test_list = TestView.as_view({
    'get': 'list',
    'post':'create'
})

urlpatterns = [
    path('test', test_list, name = 'test'),
    path('payment-activation', PaymentActivationView.as_view())
    ]