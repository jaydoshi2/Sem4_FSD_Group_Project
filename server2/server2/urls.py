# """
# URL configuration for server2 project.

# The `urlpatterns` list routes URLs to views. For more information please see:
#     https://docs.djangoproject.com/en/4.2/topics/http/urls/
# Examples:
# Function views
#     1. Add an import:  from my_app import views
#     2. Add a URL to urlpatterns:  path('', views.home, name='home')
# Class-based views
#     1. Add an import:  from other_app.views import Home
#     2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
# Including another URLconf
#     1. Import the include() function: from django.urls import include, path
#     2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
# """
# from django.contrib import admin
# from django.urls import path

# urlpatterns = [
#     path('admin/', admin.site.urls),
# ]
# server2/urls.py
from django.contrib import admin
from django.urls import include, path
from analytics import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('chatbot_app.urls')),
    path('course_recommendations/',include('course_recommendations.urls')),
    path('course-enrollment/', views.course_enrollment_chart, name='course_enrollment_data'),
    path('course-enrollment_secondary/', views.course_distribution_data, name='course_enrollment_data'),  # Add this line
    path('user_engagement_over_time/', views.user_engagement_over_time, name='user_engagement_data'),
    path('enrollment_distribution_data/', views.enrollment_distribution_data, name='enrollment_distribution_data'),
    path('course-ratings/', views.course_ratings_chart, name='course-ratings-chart'),
]
