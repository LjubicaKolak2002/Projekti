# Generated by Django 4.0.5 on 2022-06-17 08:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app1', '0006_alter_korisnik_role_delete_role'),
    ]

    operations = [
        migrations.AlterField(
            model_name='korisnik',
            name='status',
            field=models.CharField(choices=[('none', 'None'), ('izvanredni student', 'izvanredni student'), ('redovni student', 'redovni student')], max_length=50),
        ),
    ]
