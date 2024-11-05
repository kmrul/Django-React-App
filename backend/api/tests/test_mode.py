from django.test import TestCase
from api.models import User

class UserModelTest(TestCase):
    def test_create_user(self):
        username = "test@exemple.com"
        password = "test123456"

        user = User.objects.create_user(username=username, password=password)

        self.assertEqual(user.username, username)
        self.assertTrue(user.is_active)
        self.assertFalse(user.is_superuser)
        self.assertFalse(user.is_staff)

class UserMethodTest(TestCase):
    def test_get_username(self):
        user = User(username='username1')
        self.assertEqual(user.get_username(), "username1")
