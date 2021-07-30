from django.core.validators import MaxLengthValidator
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.signals import post_save

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
    inverter_efficiency = models.FloatField(blank=True, null=True, default=0.9)
    total_wattage_hourly = models.FloatField()

    load_profile = models.ForeignKey(
        'LoadProfile', related_name='loads', on_delete=models.CASCADE, null=True)

    def save(self, *args, **kwargs):
        total_usage = (self.load_rating *
                       self.hourly_usage * self.weekly_usage * self.quantity) / (7)
        self.total_wattage_hourly = total_usage
        super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.load_name} for {self.load_profile} loadProfile'


class LoadProfile(models.Model):
    total_demand = models.FloatField(default=0)
    total_ac_demand = models.FloatField(default=0)
    total_dc_demand = models.FloatField(default=0)
    user = models.ForeignKey('User', on_delete=models.CASCADE)
    name = models.CharField(max_length=120)
    peak_sun_hours = models.FloatField(default=3.5)
    battery_capacity = models.FloatField(default=0)
    inverter_rating = models.FloatField(default=0)
    inverter_efficiency = models.FloatField(blank=True, null=True)
    array_sizing = models.FloatField(default=0)
    cable_sizing = models.FloatField(default=0)
    no_of_panels = models.FloatField(default=0)
    panel_output = models.FloatField(default=0)

    def save(self, *args, **kwargs):
        self.inverter_rating = (self.total_demand + (self.total_demand * 0.3))

        return super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.name} {self.total_demand}'


class SolarModel(models.Model):
    image = models.ImageField(null=True)
    isc = models.DecimalField("Short circuit current",
                              decimal_places=2, max_digits=10)
    pveff = models.DecimalField(
        "PV efficiency", decimal_places=2, max_digits=10)
    power_rating = models.IntegerField()
    plan_file = models.FileField(null=True)
    peak_generation_factor = models.DecimalField(
        decimal_places=2, max_digits=10)
    name = models.CharField(max_length=120)

    def __str__(self):
        return self.name


def calculate_total_load(sender, **kwargs):
    total = 0
    ac_total = 0
    dc_total = 0
    load_profile = kwargs['instance'].load_profile
    loads = load_profile.loads.all()
    IE = load_profile.inverter_efficiency or None
    for load in loads:
        if not IE and load.profile_type == 'AC':
            load_profile.inverter_efficiency = load.inverter_efficiency
        if load.profile_type == 'AC':
            ac_total += load.total_wattage_hourly / load_profile.inverter_efficiency
        if load.profile_type == 'DC':
            dc_total += load.total_wattage_hourly
    load_profile.total_ac_demand = ac_total
    load_profile.total_dc_demand = dc_total
    load_profile.total_demand = dc_total + ac_total
    load_profile.save()


post_save.connect(calculate_total_load, sender=Load)
