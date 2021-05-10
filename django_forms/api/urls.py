from django.urls import path
from .views import TestView

test_list = TestView.as_view({
    'get': 'list',
    'post':'create'
})

urlpatterns = [
    path('', test_list, name = 'test'),
    ]
