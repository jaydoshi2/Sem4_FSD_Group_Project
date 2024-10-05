import json
import plotly
import plotly.express as px
from django.http import JsonResponse
from rest_framework.decorators import api_view
from .models import *  # noqa: F403
import pandas as pd

# Create your views here.

#                                                           This is completed.
@api_view(['GET'])
def user_engagement_chart(request):
    users = list(User.objects.values('username', 'numberOfQuestionsSolved', 'points', 'accuracy', 'correctQuestions'))

    trace = {
        'x': [user['numberOfQuestionsSolved'] for user in users],
        'y': [user['points'] for user in users],
        'marker': {
            'color': [user['accuracy'] for user in users],  # This determines the color
            'size': [user['correctQuestions'] for user in users],
            'colorbar': {
                'title': 'Accuracy',
            },
            'colorscale': 'Viridis',  # Specify the color scale
            'showscale': True,  # Ensure the color scale is shown
        },
        'hovertext': [user['username'] for user in users],
        'mode': 'markers',
        'type': 'scatter',
    }

    layout = {
        'title': 'User Engagement',
        'xaxis': {'title': 'Questions Solved'},
        'yaxis': {'title': 'Points'},
    }

    return JsonResponse({'data': [trace], 'layout': layout})


#                                                           This is completed.
@api_view(['GET'])
def course_enrollment_chart(request):
    # Fetch courses data
    courses = list(Course.objects.values('title', 'Enrollment_Counts', 'course_level'))

    # Create Plotly figure
    fig = px.bar(courses, x='title', y='Enrollment_Counts', color='course_level', title='Course Enrollment Counts')

    # Serialize figure to JSON
    fig_json = json.loads(fig.to_json())  # Use to_json method instead of PlotlyJSONEncoder

    return JsonResponse(fig_json)


@api_view(['GET'])
def course_distribution_data(request):
    # Query to get course data
    courses = Course.objects.values('course_type', 'Enrollment_Counts')
    distribution = {}
    
    for course in courses:
        course_type = course['course_type']
        enrollment_count = course['Enrollment_Counts']
        if course_type in distribution:
            distribution[course_type] += enrollment_count
        else:
            distribution[course_type] = enrollment_count

    # Prepare data for the pie chart
    labels = list(distribution.keys())
    values = list(distribution.values())

    return JsonResponse({'data': [{'labels': labels, 'values': values, 'type': 'pie'}], 'layout': {'title': 'Course Distribution by Type'}}, safe=False)


@api_view(['GET'])
def user_engagement_over_time(request):
    # Query the User model for the relevant data
    users = User.objects.values('signedUpAt')  # Adjust based on your User model fields

    # Create a DataFrame from the query
    users_df = pd.DataFrame(list(users))

    # Process the data
    users_df['signedUpAt'] = pd.to_datetime(users_df['signedUpAt'])
    users_df['signup_month'] = users_df['signedUpAt'].dt.to_period('M')
    user_engagement = users_df.groupby('signup_month').size()

    # Prepare response data
    response_data = {
        'months': user_engagement.index.astype(str).tolist(),
        'user_counts': user_engagement.values.tolist(),
    }

    return JsonResponse(response_data)


@api_view(['GET'])
def enrollment_distribution_data(request):
    # Query the Course model for relevant data
    courses = pd.DataFrame(list(Course.objects.values('title', 'Enrollment_Counts')))

    # Prepare the data for the pie chart
    labels = courses['title'].tolist()
    values = courses['Enrollment_Counts'].tolist()

    return JsonResponse({'labels': labels, 'values': values})


@api_view(['GET'])
def course_ratings_chart(request):
    # Fetch course data
    courses = list(Course.objects.values('title', 'Rate'))

    # Create Plotly bar chart figure
    fig = px.bar(
        courses,
        x='title',
        y='Rate',
        title='Course Ratings',
        labels={'title': 'Courses', 'Rate': 'Average Rating'},
    )

    fig.update_layout(
        xaxis_tickangle=-45,  # Rotate the x-axis labels
        yaxis_title='Average Rating',
        xaxis_title='Courses',
        bargap=0.2,  # Space between bars
    )

    # Convert the figure to JSON
    fig_json = json.loads(fig.to_json())

    return JsonResponse(fig_json)