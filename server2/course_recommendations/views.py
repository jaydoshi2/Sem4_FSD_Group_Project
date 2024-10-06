import json
from django.http import JsonResponse
import random
from django.db import connection
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel


# Define the function to execute queries and return the results
def execute_query(query, params=None):
    with connection.cursor() as cursor:
        cursor.execute(query, params)
        columns = [col[0] for col in cursor.description]
        results = [dict(zip(columns, row)) for row in cursor.fetchall()]
    return results


# Fetch courses from the database
def fetch_all_courses():
    query = '''
    SELECT course_id, title, description, course_type, thumbnail_pic_link 
    FROM "Course";
    '''
    courses = execute_query(query)
    return courses


# Combine Course Name and Description for better recommendations
def prepare_course_data(courses):
    df_courses = [
        {
            'Course Info': f"{course['title']} {course['description']}",
            'course_name': course['title'],
            'course_id': course['course_id'],
            'course_type': course['course_type'],
            'thumbnail_pic_link': course['thumbnail_pic_link']
        }
        for course in courses
    ]
    return df_courses


# Create the recommendation logic using TF-IDF and cosine similarity
def get_recommendation(user_courses, num_recommendations=5):
    # Fetch courses from the database
    courses = fetch_all_courses()
    if not courses:
        return []

    # Prepare the DataFrame for TF-IDF
    df_courses = prepare_course_data(courses)
    
    # Create a DataFrame
    titles = [course['course_name'] for course in df_courses]
    descriptions = [course['Course Info'] for course in df_courses]

    # Create the TF-IDF matrix
    tfid = TfidfVectorizer(stop_words='english')
    tfid_matrix = tfid.fit_transform(descriptions)

    # Calculate the cosine similarity matrix
    cosine_sim = linear_kernel(tfid_matrix, tfid_matrix)

    # Create a mapping of course name to index
    indices = {course['course_name']: idx for idx, course in enumerate(df_courses)}

    all_recommendations = []
    for course in user_courses:
        title = course['title']
        description = course['description']
        combined_text = title + " " + description

        if title not in indices:
            continue

        idx = indices[title]
        sim_scores = list(enumerate(cosine_sim[idx]))
        random.shuffle(sim_scores)  # Shuffle scores for diversity
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
        sim_scores = sim_scores[1:]  # Exclude the course itself
        sim_index = [i[0] for i in sim_scores]
        all_recommendations.extend(sim_index)

    from collections import Counter
    recommendation_counts = Counter(all_recommendations)
    sorted_recommendations = sorted(
        recommendation_counts.items(),
        key=lambda x: (x[1], cosine_sim[indices[user_courses[0]['title']]][x[0]]),
        reverse=True
    )

    random.shuffle(sorted_recommendations)

    top_recommendations = []
    seen_types = set()
    for idx, _ in sorted_recommendations:
        course_name = df_courses[idx]['course_name']
        course_types = df_courses[idx]['course_type']

        if course_name not in [course['title'] for course in user_courses]:
            if not any(t in seen_types for t in course_types):
                top_recommendations.append(
                    {
                        "course_name": course_name,
                        "course_type": df_courses[idx]['course_type'],
                        "thumbnail_pic_link": df_courses[idx]['thumbnail_pic_link']
                    }
                )
                seen_types.update(course_types)

        if len(top_recommendations) == num_recommendations:
            break

    # Add random courses if there are fewer recommendations
    while len(top_recommendations) < num_recommendations:
        random_course = random.choice(df_courses)
        if random_course['course_name'] not in [r['course_name'] for r in top_recommendations] and random_course['course_name'] not in [course['title'] for course in user_courses]:
            top_recommendations.append(
                {
                    "course_name": random_course['course_name'],
                    "course_type": random_course['course_type'],
                    "thumbnail_pic_link": random_course['thumbnail_pic_link']
                }
            )

    random.shuffle(top_recommendations)
    return top_recommendations


@csrf_exempt
@api_view(["POST"])
def get_course_recommendations(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user_courses = data.get('user_courses', [])

        # Pass the user_courses with title and description to the recommendation function
        recommendations = get_recommendation(user_courses)

        return JsonResponse({"recommendations": recommendations})

    return JsonResponse({"error": "Invalid request method."}, status=400)
