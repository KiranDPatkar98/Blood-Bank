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
    name = models.CharField(max_length=50, null=True)
    age = models.PositiveIntegerField(blank=True, null=True)
    phone_number = models.CharField(max_length=10, unique=True)
    address = models.TextField(max_length=100)


class BloodGroup(models.Model):
    id = models.AutoField(primary_key=True)
    group = models.CharField(max_length=10, unique=True)

    def __str__(self):
        return self.group


class BloodDonar(BaseModel):
    donar = models.ForeignKey(
        Usermaster, on_delete=models.CASCADE, to_field='username')  # we are mentioning here username as foreignkey by default it wil take primary key
    blood_group = models.ForeignKey(
        BloodGroup, on_delete=models.CASCADE, to_field='group')
    units = models.PositiveIntegerField()
    city = models.CharField(null=False, max_length=50)
    address = models.TextField(max_length=200)

    def __str__(self):
        return self.donar.username


class BloodRequests(BaseModel):
    requestor = models.ForeignKey(
        Usermaster, on_delete=models.CASCADE, to_field='username')
    blood_group = models.ForeignKey(
        BloodGroup, on_delete=models.CASCADE, to_field='group')
    units = models.PositiveIntegerField()

    def __str__(self):
        return f'requested by {self.requestor.username}'
