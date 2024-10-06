import json
import plotly.express as px
from django.http import JsonResponse
from rest_framework.decorators import api_view
# from .models import Course 
# from .models import * # Import your models
from django.db import connection
# import pandas as pd
# from rest_framework.decorators import api_view
from django.contrib.auth.models import User
import pandas as pd

# import json
# import pandas as pd
# import plotly.express as px
# from django.http import JsonResponse
# from rest_framework.decorators import api_view
# from django.db import connection


# Helper function to execute raw SQL queries
def execute_query(query, params=None):
    with connection.cursor() as cursor:
        cursor.execute(query, params)
        columns = [col[0] for col in cursor.description]
        results = [dict(zip(columns, row)) for row in cursor.fetchall()]
    return results


# User Engagement Chart
@api_view(['GET'])
def user_engagement_chart(request):
    try:
        query = '''
        SELECT username, points, numberOfQuestionsSolved, accuracy, correctQuestions 
        FROM "User";
        '''
        users = execute_query(query)

        trace = {
            'x': [user['numberOfQuestionsSolved'] for user in users],
            'y': [user['points'] for user in users],
            'marker': {
                'color': [user['accuracy'] for user in users],
                'size': [user['correctQuestions'] for user in users],
                'colorbar': {'title': 'Accuracy'},
                'colorscale': 'Viridis',
                'showscale': True,
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

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


# Course Enrollment Chart
@api_view(['GET'])
def course_enrollment_chart(request):
    try:
        query = '''
        SELECT "title", "Enrollment_Counts", "course_type" FROM "Course";
        '''
        courses = execute_query(query)
        print(courses)

        # Create a bar chart using Plotly Express
        fig = px.bar(courses, x='title', y='Enrollment_Counts', color='course_type', title='Course Enrollment Counts')

        # Convert the figure to JSON for front-end consumption
        fig_json = json.loads(fig.to_json())
        return JsonResponse(fig_json)

    except Exception as e:
        print(e)
        return JsonResponse({'error': str(e)}, status=500)


# Course Distribution by Type (Pie Chart)
@api_view(['GET'])
def course_distribution_data(request):
    try:
        query = '''
        SELECT "course_type", "Enrollment_Counts" FROM "Course";
        '''
        courses = execute_query(query)

        distribution = {}
        for course in courses:
            course_type = course['course_type']
            enrollment_count = course['Enrollment_Counts']
            if course_type in distribution:
                distribution[course_type] += enrollment_count
            else:
                distribution[course_type] = enrollment_count

        labels = list(distribution.keys())
        values = list(distribution.values())

        return JsonResponse({
            'data': [{'labels': labels, 'values': values, 'type': 'pie'}],
            'layout': {'title': 'Course Distribution by Type'}
        })

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


# Enrollment Distribution Data
@api_view(['GET'])
def enrollment_distribution_data(request):
    try:
        query = '''
        SELECT "title", "Enrollment_Counts" FROM "Course";
        '''
        courses = pd.DataFrame(execute_query(query))

        labels = courses['title'].tolist()
        values = courses['Enrollment_Counts'].tolist()

        return JsonResponse({'labels': labels, 'values': values})

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


# Course Ratings Chart
@api_view(['GET'])
def course_ratings_chart(request):
    try:
        query = '''
        SELECT "title", "Rate" FROM "Course";
        '''
        courses = execute_query(query)

        # Create a bar chart for course ratings
        fig = px.bar(courses, x='title', y='Rate', title='Course Ratings', labels={'title': 'Courses', 'Rate': 'Average Rating'})
        
        # Customize the layout
        fig.update_layout(
            xaxis_tickangle=-45,
            yaxis_title='Average Rating',
            xaxis_title='Courses',
            bargap=0.2,
        )

        # Convert the figure to JSON
        fig_json = json.loads(fig.to_json())
        return JsonResponse(fig_json)

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)



@api_view(['GET'])
def user_engagement_over_time(request):
    # Fetch users from the database using raw SQL
    with connection.cursor() as cursor:
        # Note the use of double quotes around "signedUpAt" to preserve case sensitivity
        cursor.execute('SELECT user_id, "signedUpAt" FROM "User";')
        users = cursor.fetchall()

    # Convert the data to a DataFrame
    users_df = pd.DataFrame(users, columns=['user_id', 'signedUpAt'])

    # Debugging: Check how many records are returned
    print(f"Number of records fetched: {len(users_df)}")  # Debugging line

    # Handle case if 'signedUpAt' column is empty
    if users_df.empty or users_df['signedUpAt'].isnull().all():
        return JsonResponse({'error': f"No 'signedUpAt' data found. Records fetched: {len(users_df)}"}, status=400)

    # Convert 'signedUpAt' to datetime
    users_df['signedUpAt'] = pd.to_datetime(users_df['signedUpAt'], errors='coerce')

    # Handle any null values that couldn't be converted to a valid date
    users_df = users_df.dropna(subset=['signedUpAt'])

    # Check if we still have data after dropping NaT values
    if users_df.empty:
        return JsonResponse({'error': "No valid 'signedUpAt' data found after conversion."}, status=400)

    # Extract the month from the signup date
    users_df['signup_month'] = users_df['signedUpAt'].dt.to_period('M')

    # Group by signup month and count users
    user_engagement = users_df.groupby('signup_month').size()

    # Prepare response data
    response_data = {
        'months': user_engagement.index.astype(str).tolist(),
        'user_counts': user_engagement.values.tolist(),
    }

    return JsonResponse(response_data)