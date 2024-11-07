from django.test import TestCase, Client
from api.models import User
from ..models import Note

class NoteTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="password")
        self.client = Client()
        self.client.login(username="testuser", password="password")

    def test_note_can_create(self):
        note = Note.objects.create(title="myNote", content="myNoteContent", author_id=self.user.id)
        self.assertEqual(note.title, "myNote")
