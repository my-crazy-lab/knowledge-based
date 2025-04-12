# Managing Domain Complexity

`No matter what you do, you are always facing complexity: the complexity of filtering out extraneous details, the complexity of finding what you do need, and most importantly, the complexity of keeping the data in a consistent state`

`Architectural design is system design. System design is contextual design (boundaries + trade-offs)`

## Bounded Contexts

`Decide how to divide the business domain into smaller, manageable problem domains`

## Boundaries

- Physical Boundaries
    -  Each bounded context should be implemented as an individual service/project, with the technology stack that best fits its needs.
- Ownership Boundaries
    - define communication protocols for integrating their models and systems explicitly

## Real Life 

- semantic domain
    -  defined as an area of meaning and the words used to talk about it 
    - like PORT (fe & be communicate)
- Science

# Integrating Bounded Contexts

`Bounded contexts implemented by teams with well established communication`

## Cooperation

### Partnership

- adapt with no drama or conflicts
- continuous integration of the changes applied by both teams is needed
- not be a good fit for geographically distributed teams

### Shared Kernel

- designed according to the needs of all of the bounded contexts
- immediate effect on all the bounded contexts.
- Ideally, the shared kernel will consist only of integration contracts and data structures that are intended to be passed across the bounded contexts’ boundaries
- introduces a strong dependency between the participating bounded contexts
- will naturally be applied for the subdomains that change the most: the **`CORE`**
- Minimizing the shared kernel’s scope controls the scope of cascading changes, and triggering integration tests for each change is a way to enforce early detection of integration issues

## Customer–Supplier

### Conformist 

- take it or leave it, no real motivation to support its clients’ needs 
- downstream conforms to the upstream bounded context’s model

### Anti corruption Layer

- Scenario
    - When the downstream bounded context contains a core subdomain
    - When the upstream model is unstable or inconvenient for the consumer’s needs
    - When the supplier’s contract changes oen

### Open-Host Service

- instead of the consumer, the supplier implements the translation of its internal model.
- allowing the consumer to migrate to the new version gradually

### Separate Ways

-  When the subdomain in question is Generic, and if the generic solution is easy to integrate, it may be more cost-effective to integrate it locally in each bounded context
    - Duplicating the functionality would be less expensive than
collaborating.

## Context Map

`Visual representation of the system's bounded contexts`

- High-level design
- Communication patterns
- Organizational issues

### Maintenance

`Each team is responsible for updating its own integrations with other bounded contexts`

### Limitations

`Charting a context map can be a challenging task`
