 <p align="center">
    <img src="https://drive.google.com/uc?id=1B3-QSN0_TdvONf4oNb6Rg9xwyPjUAoTG" alt="Skill Bridge Logo" width="150"/>
  </p>

<h1 align="center">Skill Bridge</h1>

<p align="center">
    <strong>Empowering skills for the future</strong>
</p>


This is a group Project of an EDTECH platform. 

### Flowchart of the course recommendation system inside server2 directory 

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

