# Generated by Django 4.2.7 on 2024-01-04 14:44

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_bloodrequests_accepted'),
    ]

    operations = [
        migrations.CreateModel(
            name='BloodInventory',
            fields=[
                ('uid', models.URLField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('created_at', models.DateField(auto_now=True)),
                ('updated_at', models.DateField(auto_now_add=True)),
                ('units', models.PositiveIntegerField()),
                ('blood_group', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.bloodgroup', to_field='group')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]