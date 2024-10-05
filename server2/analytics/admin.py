from django.contrib import admin
from .models import User, Course, Chapter, Video

admin.site.register(User)
admin.site.register(Course)
admin.site.register(Chapter)
admin.site.register(Video)