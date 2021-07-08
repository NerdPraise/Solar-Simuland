from django.core.validators import MaxLengthValidator
from django.db import models
from django.contrib.auth.models import AbstractUser
from phonenumber_field.modelfields import PhoneNumberField


class User(AbstractUser):
    is_vendor = models.BooleanField('Vendor', default=False)
    is_engineer = models.BooleanField('Engineer', default=False)
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']


class Vendor(models.Model):
    name = models.CharField('Vendor Name', max_length=125)
    user = models.OneToOneField('User', on_delete=models.CASCADE)
    address = models.CharField(max_length=1200)
    phone_number = PhoneNumberField(blank=False)


class Engineer(models.Model):
    name = models.CharField('Vendor Name', max_length=125)
    user = models.OneToOneField('User', on_delete=models.CASCADE)
    address = models.CharField(max_length=1200)
    phone_number = PhoneNumberField(blank=False)
    years_of_experience = models.IntegerField()


class Project(models.Model):
    user = models.ForeignKey('User', on_delete=models.CASCADE)
    load_profile = models.OneToOneField(
        'LoadProfile', on_delete=models.SET_NULL, null=True)


TYPE_CHOICE = (
    ('AC', 'AC'),
    ('DC', 'DC')
)


class Load(models.Model):
    load_name = models.CharField(max_length=120)
    load_rating = models.FloatField()
    quantity = models.IntegerField()
    hourly_usage = models.FloatField()
    weekly_usage = models.FloatField()
    profile_type = models.CharField(choices=TYPE_CHOICE, max_length=2)
    total_usage = models.FloatField(editable=False)
    inverter_efficiency = models.FloatField(blank=True, null=True, default=1.0)
    load_profile = models.ForeignKey(
        'LoadProfile', on_delete=models.CASCADE, null=True)

    def save(self, *args, **kwargs):
        if self.profile_type == 'AC':
            total_usage = (self.load_rating *
                           self.hourly_usage * self.weekly_usage) / (7 * self.inverter_efficiency)
        else:
            total_usage = (self.load_rating *
                           self.hourly_usage * self.weekly_usage) / 7
        self.total_usage = total_usage
        super().save(*args, **kwargs)


class LoadProfile(models.Model):
    total_demand = models.FloatField(default=0)
    user = models.ForeignKey('User', on_delete=models.CASCADE)
    name = models.CharField(max_length=120)

    # def save(self, *args, **kwargs) -> None:
    #     return super().save(*args, **kwargs)