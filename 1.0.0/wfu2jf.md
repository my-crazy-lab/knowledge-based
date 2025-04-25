# Understanding Business Domains and Subdomains in Software Development

In software development, especially in domains driven by complex business logic, it's critical to understand the landscape in which your application operates. This landscape is defined by **business domains** and their respective **subdomains**. Let's break it down.

---

## 📚 Table of Contents

- [What Is a Business Domain?](#what-is-a-business-domain)
- [Strategic vs. Tactical Design](#strategic-vs-tactical-design)
- [What Are Subdomains?](#what-are-subdomains)
  - [Core Subdomains](#core-subdomains)
  - [Generic Subdomains](#generic-subdomains)
  - [Supporting Subdomains](#supporting-subdomains)
- [Comparing Subdomains](#comparing-subdomains)
- [Discovering Domain Knowledge](#discovering-domain-knowledge)
- [Final Thoughts](#final-thoughts)
- [Managing Domain Complexity](#managing-domain-complexity)
  - [Bounded Contexts](#bounded-contexts)
  - [Boundaries](#boundaries)
  - [Real Life](#real-life)
- [Integrating Bounded Contexts](#integrating-bounded-contexts)
  - [Cooperation](#cooperation)
    - [Partnership](#partnership)
    - [Shared Kernel](#shared-kernel)
  - [Customer–Supplier](#customer–supplier)
    - [Conformist](#conformist)
    - [Anti Corruption Layer](#anti-corruption-layer)
    - [Open-Host Service](#open-host-service)
    - [Separate Ways](#separate-ways)
  - [Context Map](#context-map)
    - [Maintenance](#maintenance)
    - [Limitations](#limitations)
- [Modeling the Dimension of Time](#modeling-the-dimension-of-time)
- [Architectural Patterns](#architectural-patterns)
  - [Layer Architecture](#layer-architecture)
  - [Ports & Adapters](#ports--adapters)
  - [Command-Query Responsibility Segregation](#command-query-responsibility-segregation)
- [Model Translation](#model-translation)
  - [Stateless Model Translation](#stateless-model-translation)
    - [Synchronous](#synchronous)
    - [Asynchronous](#asynchronous)
  - [Stateful Model Translation](#stateful-model-translation)
    - [Aggregating Incoming Data](#aggregating-incoming-data)
    - [Outbox Pattern](#outbox-pattern)
    - [Saga](#saga)
    - [Process Manager](#process-manager)
  - [Heuristic](#heuristic)
  - [Decision Tree](#decision-tree)
- [DDD in Reality: Not Just a "Lab Dream"](##ddd-in-reality-not-just-a-lab-dream)
  - [Checklist for Applying DDD in Legacy Projects](#checklist-for-applying-ddd-in-legacy-projects)
  - [Modernization Strategy](#modernization-strategy)
  - [Tactical Modernization](#tactical-modernization)
  - [Ubiquitous Language](#ubiquitous-language)
  - [Strangler Pattern](#strangler-pattern)
  - [Microservices and Bounded Contexts](#microservices-and-bounded-contexts)
  - [Event-Driven Architecture](#event-driven-architecture)
    - [Event Types](#event-types)
      - [Event Notification](#event-notification)
      - [Event-Carried State Transfer (ECST)](#event-carried-state-transfer-ecst)
      - [Domain Event](#domain-event)
  - [Data Mesh for Analytical Systems](#data-mesh-for-analytical-systems)

---


## What Is a Business Domain?

A **business domain** is the area of activity in which a company operates. It encompasses the goals, processes, and challenges specific to that area. Whether it's finance, healthcare, education, or e-commerce, every domain has its own set of rules and problems to solve.

> **Not all business problems are solved through algorithms or technical solutions.**  
> Sometimes, the solution lies in understanding the **why** and **what**, not just the **how**.

---

## Strategic vs. Tactical Design

When analyzing a business domain, it's helpful to divide it into two perspectives:

- **Strategic Design**: Focuses on the *what* and *why* — understanding business goals, identifying competitive advantages, and setting direction.
- **Tactical Design**: Deals with the *how* — the technical implementation details, processes, and architecture.

---

## What Are Subdomains?

To operate effectively within a business domain, companies often break it down into **subdomains** — smaller, specialized areas of functionality.

There are three types of subdomains:

### Core Subdomains

- What sets a company apart from its competitors.
- Often where innovation and custom solutions are required.
- **Not necessarily technical**, but **crucial** to business success.
- Complex and volatile – they must evolve constantly and resist easy replication.

### Generic Subdomains

- Common to all businesses (e.g., payroll, accounting).
- These areas do not offer competitive advantage.
- Can be complex but aren't unique.
- Often solved using **open source** or standard industry tools.

### Supporting Subdomains

- Help core operations but are not central to the business's unique value.
- Tend to be simpler and more stable.
- Frequently **outsourced** or implemented using **standard practices**.

---

## Comparing Subdomains

| Feature               | Core            | Generic         | Supporting       |
|----------------------|-----------------|-----------------|------------------|
| Competitive Advantage| ✅ High          | ❌ None         | ❌ None          |
| Complexity           | 🚧 High          | 🧠 Medium        | 🧩 Low           |
| Volatility           | 🔁 Changes Often | 🛠️ Updates Over Time | 💤 Rarely Changes |
| Solution Strategy    | 🔬 Advanced Engineering | 🧰 Open Source Tools | 🤝 Outsourcing      |

---

## Discovering Domain Knowledge

Success in software development depends heavily on **understanding the business domain** — not just technically, but from a strategic standpoint.

> **Key to success**: Effective **knowledge sharing** between domain experts (those who understand the business) and software engineers (those building the solution).

Both the business domain and each subdomain may present unique challenges. Addressing them requires collaboration, curiosity, and continuous learning.

---

## Final Thoughts

When designing software for a business, it's not enough to write clean code or use the latest framework. You need to:

- Understand *what* the business does,
- *Why* it matters,
- And *how* to align your solution to its strategic goals.

By distinguishing between **core**, **generic**, and **supporting** subdomains, you can focus your effort where it matters most — delivering true business value.

## Managing Domain Complexity

> “No matter what you do, you are always facing complexity: the complexity of filtering out extraneous details, the complexity of finding what you do need, and most importantly, the complexity of keeping the data in a consistent state.”

Software architecture is ultimately **system design**, and system design is all about **contextual decisions** — setting boundaries and making trade-offs that make complexity manageable.

---

## Bounded Contexts

A **Bounded Context** is a strategic design pattern used to divide a large domain into smaller, manageable problem spaces. Each bounded context has its own **ubiquitous language**, **data model**, and **business rules**.

It allows different parts of a system to evolve independently, reducing accidental complexity.

---

## Boundaries

Understanding boundaries is key when managing complexity.

### Physical Boundaries

- Each bounded context can be implemented as a **separate project or service**.
- Teams can choose the **technology stack** that fits their needs.

### Ownership Boundaries

- Define **communication protocols** explicitly for integration.
- Each team maintains control over their bounded context.

---

## Real Life Analogies

### Semantic Domain

- In linguistics, a **semantic domain** refers to an area of meaning and the words used to talk about it.
- Similarly, in software, a **frontend and backend** might both talk about a `PORT`, but the meaning and behavior might differ slightly in each context.

### Science

- Like science, domains are broken down into specialties with shared assumptions, tools, and methods.

---

## Integrating Bounded Contexts

Bounded contexts are often owned by **different teams**, so integration requires **well-defined communication** and a shared understanding.

---

## Cooperation Models

### Partnership

- Tight collaboration, with frequent communication.
- Both sides adapt easily, no drama.
- Requires **continuous integration** of changes.
- Not ideal for **distributed teams**.

### Shared Kernel

- A **shared subset of the domain model** is used across bounded contexts.
- Strong **dependency** between contexts.
- Suited for **core subdomains** that evolve together.
- Keep the shared part **minimal** to reduce ripple effects.
- Trigger **integration tests** on every change.

---

## Customer–Supplier Relationships

### Conformist

- The consumer adapts to the supplier's model.
- No expectation of flexibility.
- Suitable when **downstream** has little influence over **upstream**.

### Anti Corruption Layer (ACL)

- Protects the consumer from unstable or inconvenient upstream models.
- The downstream introduces a **translation layer**.
- Especially useful when:
  - The downstream is implementing a **core subdomain**.
  - The upstream model is **frequently changing**.

### Open-Host Service

- The **supplier** provides a translation layer to expose its model in a consumer-friendly format.
- Allows for **gradual migration** and versioning.

### Separate Ways

- When dealing with **generic subdomains**, it might be cheaper to **duplicate functionality**.
- Avoid costly integration when there's no strategic value in sharing.

---

## Context Map

A **Context Map** is a high-level visual representation of the system's bounded contexts and their relationships.

It helps visualize:

- Integration patterns
- Team ownership
- Communication protocols

### Maintenance

- Each team is responsible for **maintaining their own integrations**.

### ⚠️ Limitations

- Creating an accurate context map can be **difficult and time-consuming**.
- Requires **deep domain knowledge** and collaboration between teams.

---

## Final Thoughts

Managing domain complexity is not about eliminating it — it's about organizing it. By using **bounded contexts**, **strategic boundaries**, and **clear integration models**, teams can build software that is resilient, maintainable, and aligned with the business.

Let your **architecture reflect your organization's reality**, and never underestimate the power of **clear context**.


## Modeling the Dimension of Time

Time is one of the most complex and powerful dimensions in software modeling. Rather than storing only the *current state*, modeling with **events over time** captures the *history* of change, enabling better auditability, traceability, and insights.

But it comes with trade-offs.

---

### Why not just replay events?

> “Reconstituting an aggregate's state from events will negatively affect the system's performance.”

Projecting events into state **requires compute power**. As more events are added, performance **degrades**, making naive event replay unsuitable for high-throughput systems without additional strategies (e.g., **snapshots**).

---

### Why not write logs to a text file?

Tempting — but flawed. Writing logs to a file alongside a database update means **you're transacting across two storage mechanisms** — and this breaks **atomicity**. You can't guarantee consistency.

---

### What if I append logs in a DB table?

Appending logs in the same transaction **preserves atomicity**, but:

- You now have **two sources of truth**: state and logs.
- The log table's schema **often degenerates into chaos**, lacking structure, purpose, or queryability.
- This model often fails to provide clear business meaning for the changes.

---

### Can I snapshot state changes using DB triggers?

Yes, but it's a **partial solution**.

- You'll capture what changed, not **why** it changed.
- It misses business intent — the “why” that events are designed to preserve.
- Also, triggers often become brittle and hard to maintain.

> Events are about business decisions. State is just the result.

---

## Architectural Patterns

Choosing the right architectural pattern is a key decision in scaling both your system and your team. Let's look at some of the most common patterns and their trade-offs.

---

## Layer Architecture

> “Layers and tiers are conceptually different: a **layer** is a logical boundary, whereas a **tier** is a physical boundary.”

### Classic layers:

1. **Presentation Layer**  
   Handles UI/UX, input/output, formatting data for users.

2. **Business Logic Layer**  
   Encapsulates the domain logic, validations, and decision-making.

3. **Data Access Layer**  
   Responsible for retrieving and storing data, abstracting persistence logic.

✅ Easy to understand  
✅ Works well for simple systems  
❌ Can lead to tight coupling  
❌ Difficult to scale or evolve

---

## Ports & Adapters (aka Hexagonal Architecture)

Decouple the **core domain** from external concerns like:

- Databases
- External services
- User interfaces

Core logic lives at the center, and all inputs/outputs go through well-defined **ports** with interchangeable **adapters**.

✅ Testable  
✅ Technology-agnostic  
✅ Encourages clean architecture  
❌ More upfront design complexity

---

## Command-Query Responsibility Segregation (CQRS)

Split **reads** and **writes** into separate models.

- **Synchronous projections**  
  Immediate updates to the read model after a write.

- **Asynchronous projections**  
  Writes go to a queue; reads are eventually consistent.

### Benefits

- Scales well
- Allows for **read model optimization**
- Fits well with **event sourcing**

### Challenges

- Increased **operational complexity**
- Must handle **eventual consistency**
- More **infrastructure** required

---

## Final Thoughts

Modeling time, choosing the right architecture, and thinking in **events, not just state**, are what separate reactive, resilient systems from rigid, brittle ones. Embracing these principles gives you not just better software, but a deeper understanding of the business it supports.

Let the architecture tell a story — of time, intent, and evolution.

## Model Translation

---

## Stateless Model Translation

A **stateless** translation model focuses on translating data on-the-fly without maintaining any session or state between interactions.

- Often implemented using the **Proxy Design Pattern** to intercept incoming or outgoing requests and transform the source model into the target model suited to its bounded context.
- Implementation depends on whether the communication between contexts is **synchronous or asynchronous**.

---

### Synchronous

- Embedding the translation logic directly inside the bounded context's source code.
- For performance, this logic can be **moved to an external component** like an **API Gateway**, which aggregates and batches requests when needed.

---

### Asynchronous

- Implement a **message proxy**: an intermediary that subscribes to messages from the source context, transforms them, and forwards them to the consuming service.
- Allows for decoupled communication and scalable processing.

---

## Stateful Model Translation

A **stateful** approach keeps track of context or aggregates data before performing translation or processing.

---

### Aggregating Incoming Data

- Combine multiple small (fine-grained) messages into a **single, unified message** to improve processing efficiency.
- Useful for both synchronous and asynchronous scenarios.

---

### Outbox Pattern

Ensures **reliable delivery** of domain events:

1. Don't send the event immediately within business logic.
2. Instead, save the event to a special **“outbox” table** in the same transaction as your aggregate.
3. A **background worker (message relay)** then:
   - Fetches unsent events.
   - Publishes them to the message bus.
   - Marks them as sent (or deletes them).

This avoids data loss and preserves consistency.

---

### Saga Pattern

Used to maintain **eventual consistency** across multiple aggregates.

- Each transaction should **only operate within a single aggregate**.
- Use **Strong Consistency** when all related data resides in one aggregate.
- Use **Eventual Consistency** when data spans multiple aggregates.
  - Data is gradually synchronized using **events and commands**.
  - This is where **Saga** comes into play: listening, reacting, and ensuring the whole process eventually reaches a valid state.

> ✅ Only data within a single aggregate can be strongly consistent.  
> ➡ Everything outside of it should rely on eventual consistency via events.

---

### Process Manager

- While Sagas handle simple "event → command" flows, **Process Managers (PMs)** are designed for **complex workflows**.
- A Process Manager has **its own state**, and it can **decide what to do next** based on business logic and conditions.

> If you find `if-else` logic in your Saga...  
> 👉 You probably need a Process Manager.

---

## Heuristic

**Heuristics** are practical rules or methods that help guide decisions effectively by ignoring noise and focusing on what matters most.

- There are many useful heuristics for defining **service boundaries**.
- **Size is one of the least useful** indicators.
- Refactoring **bounded contexts** is costly, especially when they're managed by different teams.
  - ➡ These poorly defined boundaries often become **technical debt**.

### Practical Advice

- When the domain is unclear or changing rapidly, **start with a wide bounded context**.
- Group **closely related subdomains**, especially in the **core**, into a single context.
- ➡ Once you understand the domain better, split them up later.
- Refactoring **code boundaries** is cheaper than refactoring **physical boundaries** (services, databases, team structure).

---

## Decision Tree

> Visual aids can help clarify which model translation or consistency strategy to choose.

![This is a screenshot](/images/Figure103.png)  
![This is a screenshot](/images/Figure107.png)

# DDD in Reality: Not Just a "Lab Dream"

Most of the projects you'll encounter are brownfield – full of legacy code and technical debt. Ironically, these are the projects that **need DDD the most** – to untangle complexity, recover domain knowledge, and reorganize the system.

## DDD Checklist for Legacy Projects

| Task                            | Tool/Technique                              |
|----------------------------------|----------------------------------------------|
| Understand business and domain   | Stakeholder interviews, org charts           |
| Classify subdomains              | Core / Supporting / Generic                  |
| Map the current architecture     | Context Mapping                              |
| Evaluate the codebase            | Check if existing patterns align             |
| Run EventStorming sessions       | Recover logic & define Ubiquitous Language   |
| Start small                      | Refactor a small subdomain first             |

## Modernization Strategy

- Rewriting the system from scratch rarely works.
- A better approach: **refactor safely** by preserving domain logic and restructuring the codebase.

## Tactical Modernization

Focus on the **most painful areas** – where **business value is high** but **technical design is poor**.

## Ubiquitous Language

A shared language across the team is crucial. Use **EventStorming** to model the domain clearly and align team understanding.

## Strangler Pattern

Inspired by tropical plants that grow around and eventually replace the host tree.

### How it works:
- Create a new bounded context (`strangler`).
- Implement new requirements in the `strangler`.
- Gradually migrate old logic from the legacy system.
- Freeze development in the old system (except emergency hotfixes).
- Once everything is moved, retire the legacy system.

💡 Often used with the **Façade Pattern**, which routes requests to either old or new systems depending on migration status.

**Shared databases are temporary** – aim to separate them eventually.

> DDD is not just about aggregates or value objects.  
> 👉 It's about letting the domain guide software design.

---

# Microservices and Bounded Contexts

- Not all **bounded contexts** are **microservices**, but all microservices should be a bounded context.
- Aggregates define the narrowest valid boundaries.
- Microservices are not just about breaking down functionality, but designing **interactions**.
- Sometimes, a microservice is just a **module**; over-decomposition increases complexity.
- Subdomains are a safe boundary for microservice design.

---

# Event-Driven Architecture (EDA)

EDA ≠ Event Sourcing, even though both use *events*.

- **EDA** = inter-service communication.
- **Event Sourcing** = internal service state modeled by events.

### Event Schema
Typical event contains:
- **Metadata** (e.g., timestamp, event type)
- **Payload** (actual event data)

## Event Types

### Event Notification
- Tells others an event occurred, without full data.
- Consumers must fetch more info via API.
- ✅ Good for:
  - **Security** (limit data exposure)
  - **Concurrency** (ensure freshness)

### Event-Carried State Transfer (ECST)
- Carries full data needed for consumer to act.
- Async data sync between producer/consumer.
- ✅ Good for:
  - **Performance** (cache locally)
  - **Resilience** (can continue when producer is down)
- ⚠️ Watch out for:
  - Versioning issues
  - Data overexposure

### Domain Event
- Describes a **business moment**.
- Contains all info, no follow-up needed.
- Center of Event Sourcing design.
- Use even when there's **no subscriber** (for audit/history).

## Choosing the Right Event Type

| Type         | When to Use                                                         | Pros                                          | Cons                                           |
|--------------|---------------------------------------------------------------------|-----------------------------------------------|------------------------------------------------|
| Notification | Announce that something happened; hide internal state              | Lightweight, secure, clear boundaries         | Requires consumer to fetch extra data          |
| ECST         | Provide full state to avoid API calls                               | Better perf, resilient, cache-friendly        | Schema coupling, possible over-sharing         |
| Domain Event | Capture important domain changes, support event sourcing            | Self-contained, audit-ready                   | May require good modeling to avoid overuse     |

> Only the paranoid survive.
> - The network **will** be slow.
> - Servers **will** fail.
> - Events **will** be late, duplicated, or out of order.
> - It'll happen on **weekends and holidays**.

**"Driven"** in *event-driven* means everything depends on **reliable message delivery**. Don't just *hope* it works.

### Design Notes:
- Distinguish between **public** and **private** events.
- Evaluate **consistency needs**:
  - Use **ECST** if eventual consistency is okay.
  - Use **Notification + Query** if consumer needs fresh data.

---

# Data Mesh for Analytical Systems

- Like domain events, analytical data is **append-only** – no deletions, no edits.
- To show something is obsolete, **add a new record** with updated state.

## OLTP vs OLAP

| Aspect         | OLTP (Operational)                      | OLAP (Analytical)                          |
|----------------|------------------------------------------|---------------------------------------------|
| Data granularity | Fine-grained (detailed transactions)     | Aggregated (summary for insights)           |
| Schema types    | Star or Snowflake schemas                | Snowflake often used for normalization      |

## Snowflake Schema

- Dimensions are further normalized into multiple levels.
- Saves storage and improves maintainability.
- Requires more **joins** → higher query cost.

## Beware the Data Swamp

Without governance, a data lake can become a **data swamp** – unmanageable, low-quality data pool.

---
