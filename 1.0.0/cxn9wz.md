# Business Problems and Data Science Solutions

`Data mining is a craft. As with many crafts, there is a well-defined process that can help
to increase the likelihood of a successful result`

## Data mining process

```mermaid
flowchart TD

A("Business Understanding"):::green
C("Data Understanding"):::green
D("Data Preparation"):::green
E("Modeling"):::orange
F("Development"):::blue
G("Evaluation"):::pink

A <--> C --> D  <--> E --> G --> F
G --> A

%% Styling
classDef green color:#000000,fill:#B2DFDB,stroke:#00897B,stroke-width:2px;
classDef orange color:#000000,fill:#FFE0B2,stroke:#FB8C00,stroke-width:2px;
classDef blue color:#000000,fill:#BBDEFB,stroke:#1976D2,stroke-width:2px;
classDef pink color:#000000,fill:#F8BBD0,stroke:#C2185B,stroke-width:2px;

```

### Business understanding

- What exactly do we want to do? 
- How exactly would we do it? 
- What parts of this use scenario constitute possible data mining models?

### Data understanding

- Understand the strengths and limitations of the data

### Data preparation

- The data are manipulated and converted into forms that yield better results.

### Modeling

- Data mining techniques are applied

### Evaluation

- Have confidence that the models and patterns extracted from the data are true regularities and not just idiosyncrasies or sample anomalies
- Possible to deploy results immediately after data mining 
- To help ensure that the model satisfies the original business goals

### Deployment

- The model be recoded for the production environment

## Implications for Managing the Data Science Team

- Mistake: view the data mining process as a software development cycle
    - It iterates on approaches and strategy rather than on software designs
    - Analytics skill for a team:
        - formulate problems well
        - **prototype** solutions **quickly**
        - **make reasonable assumptions** in the face of **ill-structured problems**
        - design **experiments** that represent **good investments**
        - **analyze results**

## Analytics techniques

- Statistics
- Database quering
- Data warehouses
    - Collect and coalesce data from across an enterprise
- Regression Analysis
    - A way of mathematically sorting out which of those variables does indeed have an impact
- Machine Learning (methods)
- Data Mining (or KDD: Knowledge Discovery and Data Mining)
