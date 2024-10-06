from django.db import models

class User(models.Model):
    user_id = models.UUIDField(primary_key=True, default=None, editable=False)
    google_id = models.CharField(max_length=255, unique=True, null=True)
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    password = models.CharField(max_length=255, null=True)
    profilePic = models.URLField(null=True)
    birthDate = models.DateField(null=True)
    signedUpAt = models.DateTimeField(auto_now_add=True)
    bio = models.TextField(null=True)
    resetToken = models.CharField(max_length=255, null=True)
    refreshToken = models.CharField(max_length=255, null=True)
    points = models.IntegerField(default=0)
    # Add your relationships here if needed

class Course(models.Model):
    course_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    course_type = models.CharField(max_length=255)
    description = models.TextField()
    thumbnail_pic_link = models.URLField()
    certificate_preview_link = models.URLField()
    number_of_people_rated = models.IntegerField(default=0)
    course_level = models.CharField(max_length=50)
    Rate = models.FloatField(default=0)
    points_providing = models.IntegerField(default=0)
    Enrollment_Counts = models.IntegerField(default=0)
    price = models.IntegerField(default=0)
    # Add your relationships here if needed
