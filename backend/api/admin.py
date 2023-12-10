from django.contrib import admin
from .models import BloodGroup

# Register your models here.

admin.site.register(BloodGroup)


class BloodGroupAdmin(admin.ModelAdmin):
    list_display = ('id', 'group')
