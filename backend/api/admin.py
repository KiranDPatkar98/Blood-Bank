from django.contrib import admin
from .models import BloodGroup, BloodDonor, BloodRequests

# Register your models here.

admin.site.register(BloodGroup)
admin.site.register(BloodDonor)
admin.site.register(BloodRequests)


class BloodGroupAdmin(admin.ModelAdmin):
    list_display = ('id', 'group')


class BloodDonorAdmin(admin.ModelAdmin):
    list_display = ('donor', 'blood_group', 'units',
                    'body_weight', 'accepted', 'description')


class BloodRequestsAdmin(admin.ModelAdmin):
    list_display = ('requestor', 'blood_group', 'units')
