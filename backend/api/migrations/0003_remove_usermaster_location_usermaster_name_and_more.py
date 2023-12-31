# Generated by Django 4.2.7 on 2023-12-09 04:51

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_usermaster_age'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='usermaster',
            name='location',
        ),
        migrations.AddField(
            model_name='usermaster',
            name='name',
            field=models.CharField(max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='usermaster',
            name='phone_number',
            field=models.CharField(max_length=10, unique=True),
        ),
        migrations.AlterField(
            model_name='usermaster',
            name='uid',
            field=models.URLField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False),
        ),
    ]
