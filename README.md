# Sem4_FSD_Group_Project
This is a group Project of an EDTECH platform. 


```mermaid
graph TD
    A[Input Course Vector] --> B[Calculate Similarities]
    C --> D[Sort & Filter]
    
    subgraph "Mathematical Process"
        E[TF-IDF Calculation]
        F[Cosine Similarity]
        G[Score Normalization]
    end
    
    B --> E
    E --> F
    F --> G
    G --> C[Get Similarity Scores]
    
    subgraph "Recommendation Selection"
        H[Apply Diversity Rules]
        I[Type Filtering]
        J[Final Ranking]
    end
    
    D --> H
    H --> I
    I --> J
