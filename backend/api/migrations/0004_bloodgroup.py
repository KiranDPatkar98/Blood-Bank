# Generated by Django 4.2.7 on 2023-12-10 06:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_remove_usermaster_location_usermaster_name_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='BloodGroup',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('group', models.CharField(max_length=10)),
            ],
        ),
    ]
