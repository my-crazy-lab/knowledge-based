Software developers build `outstanding skills` in searching online for solutions to a current problem. For example, if they need to `figure out` how to configure a particular tool in their environment, expert use of Google finds the answer. But that’s not true for architects.
For architects, many problems present unique challenges because they `conflate the exact environment` and `circumstances of your organization`

Because virtually every problem presents `novel challenges`, the real job of an architect lies in their `ability` to `objectively determine` and `assess the set of` trade-offs on either side of a consequential decision to resolve it `as well as possible`

Many of the `instincts` of data architects to build tightly coupled systems create conflicts within modern distributed architectures. For example, architects and DBAs must ensure that business data survives the breaking apart of monolith systems and that the business can still `derive value` from its data `regardless of` `architecture undulations.`

Documenting a decision is important for an architect, but governing the proper use of the decision is a separate topic.

In the era before continuous integration, most software projects included a lengthy integration phase. Each developer was expected to work in some level of isolation from others, then integrate all the code at the end into an integration phase.

Architects must `watch out` for `composite architecture characteristics`—ones that aren’t objectively measurable but are really composites of other `measurable things`

`Holistic` fitness functions validate a `combination of architecture characteristics`. A complicating feature of architecture characteristics is the `synergy` they sometimes `exhibit` with other architecture characteristics. For example, if an architect wants to improve security, `a good chance` exists that it will affect performance. Holistic fitness functions exercise a combination of `interlocking architecture characteristics` to ensure that the combined effect won’t negatively affect the architecture.

Software architecture is by its nature abstract: we cannot know what unique combination of platforms, technologies, commercial software, and the other dizzying array of possibilities our readers might have, except that no two are exactly alike. We cover many abstract ideas, but must ground them with some implementation details to make them concrete.

When two services communicate with each other, one of the fundamental questions for an architect is whether that communication should be synchronous or asynchronous.

Increased scalability is only one benefit of architectural modularity. Another important benefit is agility, the ability to respond quickly to change. An article from Forbes in January 2020 by David Benjamin and David Komlos stated the following: 

There is one thing that will separate the pack into winners and losers: the on-demand capability to make bold and decisive course corrections that are executed effectively and with urgency.

Businesses must be agile in order to survive in today’s world. However, while business stakeholders may be able to make quick decisions and change direction quickly, the company’s technology staff may not be able to implement those new directives fast enough to make a difference. Enabling technology to move as fast as the business (or, conversely, preventing technology from slowing the business) requires a certain level of architectural agility the five key architectural characteristics to support agility, speed-tomarket, and, ultimately, competitive advantage in today’s marketplace are availability (fault tolerance), scalability, deployability, testability, maintainability.

### Modularity Drivers

1. Maintainability
    - Component coupling: The degree and manner to **which components know about one another**
    - Component cohesion: The degree and manner to **which the operations of a component interrelate**
    - Cyclomatic complexity: The overall level of **indirection and nesting within a component**
    - Component size: The **number of aggregated statements of code** within a component
- Technical versus domain partitioning: Components aligned by technical usage or by domain purpose

### architecture decomposition

either tactical forking or component based decomposition

### Data Disintegrators

Data disintegration drivers provide answers and justifications for the question “when
should I consider breaking apart my data?” The six main disintegration drivers for
breaking apart data include the following:

**Change control**

How many services are impacted by a database table change?

**Connection management**

Can my database handle the connections needed from multiple distributed serv‐
ices?

- Establishing a connection to a database is an expensive operation.
- A database connection pool is often used not only to increase performance, but also to limit the number
of concurrent connections an application is allowed to use

**Scalability**

Can the database scale to meet the demands of the services accessing it?

**Fault tolerance**

How many services are impacted by a database crash or maintenance downtime?

**Architectural quanta**

Is a single shared database forcing me into an undesirable single architecture
quantum?

**Database type optimization**

Can I optimize my data by using multiple database types?

## split database: 5 steps

Analyze Database and Create Data Domains

Assign Tables to Data Domains

Separate Database Connections to Data Domains

Move Schemas to Separate Database Servers

Switch Over to Independent Database Servers

## question

1. Compare SOA and Micro services?