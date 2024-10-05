from django.db import models
import uuid

# Create your models here.
class User(models.Model):
    user_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    google_id = models.CharField(max_length=255, unique=True, null=True, blank=True)
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    password = models.CharField(max_length=128, null=True, blank=True)
    profilePic = models.URLField(null=True, blank=True)
    birthDate = models.DateTimeField(null=True, blank=True)
    signedUpAt = models.DateTimeField(auto_now_add=True)
    bio = models.TextField(null=True, blank=True)
    resetToken = models.CharField(max_length=255, null=True, blank=True)
    refreshToken = models.CharField(max_length=255, null=True, blank=True)
    accuracy = models.FloatField(default=0.0)
    numberOfQuestionsSolved = models.IntegerField(default=0)
    correctQuestions = models.IntegerField(default=0)
    points = models.IntegerField(default=0)

    def __str__(self):
        return self.username

class Course(models.Model):
    course_id = models.AutoField(primary_key=True)  # Auto-incrementing primary key
    title = models.CharField(max_length=255)
    course_type = models.CharField(max_length=100)
    description = models.TextField()
    thumbnail_pic_link = models.URLField()
    certificate_preview_link = models.URLField()
    number_of_ratings = models.IntegerField(default=0)
    course_level = models.CharField(max_length=50)
    Rate = models.FloatField(default=0.0)
    points_providing = models.IntegerField(default=0)
    Enrollment_Counts = models.IntegerField(default=0)
    price = models.IntegerField(default=0)

    def __str__(self):
        return self.title

class Video(models.Model):
    video_id = models.AutoField(primary_key=True)  # Auto-incrementing primary key
    title = models.CharField(max_length=255)  # Title of the video
    chapterId = models.IntegerField()  # Foreign key reference to chapter (assuming another model represents Chapter)
    videoLink = models.CharField(max_length=255)  # Path to the video file
    likesCount = models.PositiveIntegerField(default=0)  # Number of likes
    dislikesCount = models.PositiveIntegerField(default=0)  # Number of dislikes

    def __str__(self):
        return self.title

class Chapter(models.Model):
    chapter_id = models.AutoField(primary_key=True)  # Auto-incrementing primary key
    title = models.CharField(max_length=255)  # Chapter title
    course = models.ForeignKey('Course', on_delete=models.CASCADE, related_name='chapters')  # ForeignKey to Course

    def __str__(self):
        return self.title
