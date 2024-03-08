# Generated by Django 4.0.5 on 2022-06-20 19:05

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app1', '0008_alter_korisnik_status_upisi'),
    ]

    operations = [
        migrations.AlterField(
            model_name='korisnik',
            name='status',
            field=models.CharField(choices=[('none', 'None'), ('izvanredni student', 'izvanredni student'), ('redovni student', 'redovni student')], max_length=50),
        ),
        migrations.AlterField(
            model_name='upisi',
            name='predmet',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='predmeti', to='app1.predmeti'),
        ),
        migrations.AlterField(
            model_name='upisi',
            name='status',
            field=models.CharField(choices=[('upisan', 'Upisan'), ('polozen', 'Polozen')], default='upisan', max_length=64),
        ),
        migrations.AlterField(
            model_name='upisi',
            name='student',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='korisnik', to=settings.AUTH_USER_MODEL),
        ),
    ]