import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
import random

# Load the data
data = pd.read_csv('Coursera.csv')
df = pd.DataFrame(data)

# Create the TF-IDF matrix
tfid = TfidfVectorizer(stop_words='english')
tdif_matrix = tfid.fit_transform(df['Course Description'])

# Calculate the cosine similarity matrix
cosine_sim = linear_kernel(tdif_matrix, tdif_matrix)

# Create a mapping of course name to index
indices = pd.Series(df.index, index=df['Course Name'])


def get_recommendation(titles, cosine_sim=cosine_sim, num_recommendations=5):
    all_recommendations = []
    for title in titles:
        if title not in indices:
            continue
        idx = indices[title]
        sim_scores = list(enumerate(cosine_sim[idx]))
        # Introduce randomness in the similarity score ranking
        random.shuffle(sim_scores)  # Shuffle scores for diversity
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
        sim_scores = sim_scores[1:]  # Exclude the course itself
        sim_index = [i[0] for i in sim_scores]
        all_recommendations.extend(sim_index)

    # Count occurrences of each recommendation
    from collections import Counter
    recommendation_counts = Counter(all_recommendations)

    # Sort recommendations by count and then by similarity score
    sorted_recommendations = sorted(
        recommendation_counts.items(),
        key=lambda x: (x[1], cosine_sim[indices[titles[0]]][x[0]]),
        reverse=True)

    # Shuffle the sorted recommendations a little for diversity
    random.shuffle(sorted_recommendations)

    # Get top unique recommendations
    top_recommendations = []
    seen_types = set()
    for idx, _ in sorted_recommendations:
        course_name = df['Course Name'].iloc[idx]
        course_types = df['course_type'].iloc[idx].split('|')

        if course_name not in titles:
            # Check if we've already recommended a course of this type
            if not any(t in seen_types for t in course_types):
                top_recommendations.append(
                    (course_name, df['course_type'].iloc[idx],
                     df['thumbnail_pic_link'].iloc[idx]))
                seen_types.update(course_types)

        if len(top_recommendations) == num_recommendations:
            break

    # If we don't have enough diverse recommendations, fill with random courses
    while len(top_recommendations) < num_recommendations:
        random_course = df.iloc[random.randint(0, len(df) - 1)]
        if random_course['Course Name'] not in [
                r[0] for r in top_recommendations
        ] and random_course['Course Name'] not in titles:
            top_recommendations.append(
                (random_course['Course Name'], random_course['course_type'],
                 random_course['thumbnail_pic_link']))

    # Shuffle the final recommendations to avoid repetition
    random.shuffle(top_recommendations)

    return top_recommendations


# Example usage
user_enrolled_courses = [
    'Nutrition and Health', 'Data Science Fundamentals',
    'Environmental Science and Sustainability'
]
recommendations = get_recommendation(user_enrolled_courses)

print("Top 5 Recommended Courses:")
for rec in recommendations:
    print(rec)
