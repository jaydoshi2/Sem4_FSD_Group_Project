import json
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from django.http import JsonResponse
import random
import os
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view

# Load the course data
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
data_path = os.path.join(BASE_DIR, 'course_recommendations', 'Coursera.csv')
data = pd.read_csv(data_path)
df = pd.DataFrame(data)

# Combine Course Name and Description for better recommendations
df['Course Info'] = df['Course Name'] + " " + df['Course Description']

# Create the TF-IDF matrix
tfid = TfidfVectorizer(stop_words='english')
tfid_matrix = tfid.fit_transform(df['Course Info'])

# Calculate the cosine similarity matrix
cosine_sim = linear_kernel(tfid_matrix, tfid_matrix)

# Create a mapping of course name to index
indices = pd.Series(df.index, index=df['Course Name'])

def get_recommendation(courses, cosine_sim=cosine_sim, num_recommendations=5):
    all_recommendations = []
    for course in courses:
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
        key=lambda x: (x[1], cosine_sim[indices[courses[0]['title']]][x[0]]),
        reverse=True
    )

    random.shuffle(sorted_recommendations)

    top_recommendations = []
    seen_types = set()
    for idx, _ in sorted_recommendations:
        course_name = df['Course Name'].iloc[idx]
        course_types = df['course_type'].iloc[idx].split('|')

        if course_name not in [course['title'] for course in courses]:
            if not any(t in seen_types for t in course_types):
                top_recommendations.append(
                    {
                        "course_name": course_name,
                        "course_type": df['course_type'].iloc[idx],
                        "thumbnail_pic_link": df['thumbnail_pic_link'].iloc[idx]
                    }
                )
                seen_types.update(course_types)

        if len(top_recommendations) == num_recommendations:
            break

    # Add random courses if there are fewer recommendations
    while len(top_recommendations) < num_recommendations:
        random_course = df.iloc[random.randint(0, len(df) - 1)]
        if random_course['Course Name'] not in [r['course_name'] for r in top_recommendations] and random_course['Course Name'] not in [course['title'] for course in courses]:
            top_recommendations.append(
                {
                    "course_name": random_course['Course Name'],
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
        print("REQ DATA ",data)
        user_courses = data.get('user_courses', [])
        print("USER COURSES ",user_courses)
        # Pass the user_courses with title and description to the recommendation function
        recommendations = get_recommendation(user_courses)
        print("RECOMMENDED COURSES ",recommendations)
        return JsonResponse({"recommendations": recommendations})

    return JsonResponse({"error": "Invalid request method."}, status=400)
