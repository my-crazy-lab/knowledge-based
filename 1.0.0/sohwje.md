#  Modeling the Dimension of Time

- Reconstituting an aggregate’s state from events will negatively affect the system’s performance. It will degrade as events are added. How can this even work?
    - Projecting events into a state representation indeed requires compute power, and that need will grow as more events are added to an aggregate’s list.
- Why can’t I just write logs to a text file and use it as an audit log?
    -  it’s a transaction against two storage mechanisms: the database and the file
- Why can’t I keep working with a state-based model, but in the same database transaction, append logs to a logs table?
    - the state-based representation is used as the source of truth,
the additional log table’s schema usually degrades into chaos quickly
- Why can’t I just keep working with a state-based model but add a database trigger that
will take a snapshot of the record and copy it into a dedicated “history” table?
    - misses the business contexts: why the fields were changed

# Architectural Patterns

## Layer architecture

`layers and tiers are conceptually different: a layer is a logical boundary, whereas a tier is a physical boundary`

- Presentation layer
- Business logic layer
- Data access layer

## Ports & Adapters

- databases
- external services
- UI

## Command-Query Responsibility Segregation

- Synchronous projections
- Asynchronous projections
- Challenges