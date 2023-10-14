from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import Payment_Activation

User = get_user_model()

class PaymentActivationTestCase(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(username='testuser', password='testpassword')

    def test_valid_instance(self):
        instance = Payment_Activation(
            user=self.user,
            student_number=12345,
            faculty='Engineering',
            # ... other fields ...
        )
        instance.full_clean()
        instance.save()
        self.assertIsNotNone(instance.pk)

    def test_invalid_instance(self):
        # Intentional value error
        instance = Payment_Activation(
            user=self.user,
            student_number='abc',  # Invalid data type
            faculty='Engineering',
            # ... other fields ...
        )
        self.assertRaises(ValueError)

    def test_submission(self):
        instance = Payment_Activation(
            user=self.user,
            student_number=12345,
            faculty='Engineering',
            submitted=True,
            submitted_at='2023-08-10 12:00:00',
            # ... other fields ...
        )
        instance.full_clean()
        instance.save()
        self.assertTrue(instance.submitted)

    def test_unique_confirmation_numbers(self):
        instance1 = Payment_Activation.objects.create(
            user=self.user,
            student_number=12345,
            faculty='Engineering',
            # ... other fields ...
        )
        instance2 = Payment_Activation.objects.create(
            user=self.user,
            student_number=54321,
            faculty='Arts & Science',
            # ... other fields ...
        )
        self.assertNotEqual(instance1.confirmation_number, instance2.confirmation_number)

    def test_student_number_constraints(self):
        # Intentional value error
        # Test student number must be positive
        instance = Payment_Activation(
            user=self.user,
            student_number=-123,
            faculty='Engineering',
            # ... other fields ...
        )
        self.assertRaises(ValueError)

    def test_award_letter_max_length(self):
        # Intentional value error
        max_length = Payment_Activation._meta.get_field('award_letter').max_length
        instance = Payment_Activation(
            user=self.user,
            student_number=12345,
            faculty='Engineering',
            # ... other fields ...
            award_letter='x' * (max_length + 1),  # Exceed max length
        )
        self.assertRaises(ValueError)

    def test_save_modified_at(self):
        instance = Payment_Activation(
            user=self.user,
            student_number=12345,
            faculty='Engineering',
            # ... other fields ...
        )
        instance.full_clean()
        instance.save()
        self.assertIsNotNone(instance.modified_at)

    # Add more test methods for other fields and behaviors...

# Add more test classes for related models and scenarios...
