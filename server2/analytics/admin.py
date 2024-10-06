from django.contrib import admin
from .models import User, Course

admin.site.register(User)
admin.site.register(Course)
# admin.site.register(Chapter)
# admin.site.register(Video)