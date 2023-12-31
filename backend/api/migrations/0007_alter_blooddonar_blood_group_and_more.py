# Generated by Django 4.2.7 on 2023-12-10 08:01

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_bloodrequests'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blooddonar',
            name='blood_group',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.bloodgroup', to_field='group'),
        ),
        migrations.AlterField(
            model_name='blooddonar',
            name='body_weight',
            field=models.PositiveIntegerField(help_text='Weight in KG'),
        ),
        migrations.AlterField(
            model_name='bloodgroup',
            name='group',
            field=models.CharField(max_length=10, unique=True),
        ),
    ]
