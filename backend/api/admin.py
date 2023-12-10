from django.contrib import admin
from .models import BloodGroup, BloodDonar, BloodRequests

# Register your models here.

admin.site.register(BloodGroup)
admin.site.register(BloodDonar)
admin.site.register(BloodRequests)


class BloodGroupAdmin(admin.ModelAdmin):
    list_display = ('id', 'group')


class BloodDonarAdmin(admin.ModelAdmin):
    list_display = ('donar', 'blood_group', 'units',
                    'body_weight', 'accepted', 'description')


class BloodRequestsAdmin(admin.ModelAdmin):
    list_display = ('requestor', 'blood_group', 'units')
