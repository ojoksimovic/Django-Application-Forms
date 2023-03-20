from django.urls import path
from .views import TestView, PaymentActivationView, OGSView, DocumentView

test_list = TestView.as_view({
    'get': 'list',
    'post':'create'
})

urlpatterns = [
    path('test/', test_list, name = 'test'),
    path('payment-activation/', PaymentActivationView.as_view()),
    path('ogs/', OGSView.as_view()),
    path('upload/', DocumentView.as_view())
    ]