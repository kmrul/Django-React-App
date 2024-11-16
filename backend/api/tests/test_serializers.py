from api.models import User
from rest_framework.test import APITestCase
from api.serializers import UserSerializer

class UserSerializerTestCase(APITestCase):
    def test_user_serializer_valid_data(self):
        data = {
            "username": "testuser",
            "password": "testpassword",
            "confirm_password": "testpassword"
        }
        serializer = UserSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        self.assertEqual(serializer.errors, {})
