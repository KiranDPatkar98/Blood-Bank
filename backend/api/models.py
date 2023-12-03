import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class BaseModel(models.Model):
    uid = models.URLField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateField(auto_now=True)
    updated_at = models.DateField(auto_now_add=True)

    class Meta:
        abstract = True


class Usermaster(AbstractUser, BaseModel):
    age = models.PositiveIntegerField(blank=True, null=True)
    phone_number = models.CharField(max_length=10, unique=True)
    location = models.CharField(max_length=50)
    address = models.TextField(max_length=100)
