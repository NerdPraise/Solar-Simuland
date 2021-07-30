from django.contrib import admin

from .models import (Engineer, Load, LoadProfile, Project, SolarModel, User, Vendor)

admin.site.register(Engineer)
admin.site.register(Load)
admin.site.register(LoadProfile)
admin.site.register(Project)
admin.site.register(SolarModel)
admin.site.register(User)
admin.site.register(Vendor)
