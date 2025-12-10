# Project Checklist (ready production)

## 1. Design Doc (1-pager + Appendix)
**Purpose:** Define design, limits, and constraints before coding.  
**Contents:**
- **Invariants:** Things that must always be true (e.g., account balance ≥ 0).  
- **Failure model:** How the system behaves under node failures, network issues, or DB downtime.  
- **SLOs (Service Level Objectives):**  Example: 99.9% requests < 200ms latency.  
- **Data retention:** How long data should be kept.  
- **Compliance constraints:** Legal/security constraints (GDPR, PCI DSS, etc.).

---

## 2. Prototype (PoC)
**Purpose:** Validate the idea works before scaling.  
**Contents:**
- Single-node correctness: Run on one node to verify core logic.  
- Unit tests: Test individual components/functions.  
- Linearizability tests (if distributed): Ensure consistent state updates.

---

## 3. Scale & Operations
**Purpose:** Prepare system for production with observability.  
**Contents:**
- Deploy multi-node setup to test scalability.  
- Observability: metrics & tracing via OTel / Prometheus / Grafana / Jaeger.  
- Logging: Loki / ELK stack for debugging and auditing.

---

## 4. Chaos & Correctness Tests
**Purpose:** Ensure robustness and consistency under failures.  
**Contents:**
- Network partitions: simulate with `tc/netem`.  
- Process kill: randomly terminate nodes.  
- Disk stalls: simulate slow IO.  
- Jepsen-style histories: analyze consistency for distributed DBs.  

---

## 5. Reconciliation & Postmortem
**Purpose:** Test recoverability and incident handling.  
**Contents:**
- Intentionally break the system.  
- Write RCA (Root Cause Analysis).  
- Apply fixes + regression tests.

---

## 6. Compliance Checklist
**Purpose:** Ensure system meets legal and security requirements.  
**Contents:**
- Data encryption at rest & in transit.  
- Data localization: store data in required regions.  
- Audit trails: log all operations for traceability.  
- Retention/erasure mechanisms: comply with data deletion policies.

---

# Non-Functional Requirements Checklist

## 1. Performance
**Purpose:** Ensure system handles load efficiently.  
**Items:**
- [ ] Load/stress test: measure latency, throughput, resource usage.  
- [ ] Connection pool configuration.  
- [ ] Caching strategy.  
- [ ] Query optimization: index usage, transaction design.

---

## 2. Availability
**Purpose:** Ensure system stays up and recoverable.  
**Items:**
- [ ] Health check endpoints.  
- [ ] Graceful shutdown.  
- [ ] Retry logic for transient failures.  
- [ ] Correct timeouts for external calls.  
- [ ] Circuit breaker for failing dependencies.

---

## 3. Back Pressure
**Purpose:** Prevent overload on database or services.  
**Items:**
- [ ] DB migration strategy to avoid overload.  
- [ ] DB version compatibility checks.

---

## 4. Scalability
**Purpose:** Ensure system can grow without major redesign.  
**Items:**
- [ ] Stateless service design.  
- [ ] Queueing for asynchronous workloads.

---

## 5. Security
**Purpose:** Protect system and data.  
**Items:**
- [ ] API security (authentication, authorization, rate limiting).  
- [ ] Data security (encryption at rest/in transit, sensitive data handling).

---

## 6. Fault Tolerance
**Purpose:** Ensure system continues to work despite failures.  
**Items:**
- [ ] Idempotent operations.  
- [ ] Dead Letter Queue (DLQ) for failed messages.  
- [ ] Bulkhead Isolation: isolate external dependencies to prevent cascading failures.  
- [ ] Fallback strategies: provide alternative responses when dependencies fail.

---

## 7. API & System Design Best Practices

### 7.1 Clear API Invariants
- Define rules that must always hold (e.g., balance ≥ 0).  
- Avoid logic bugs, race conditions, and dirty data.

### 7.2 Avoid Long-Running Transactions
- Prevent holding old rows too long → reduces VACUUM overhead in DB.

### 7.3 Graceful Degradation
- **Definition:** System reduces service quality rather than failing completely.  
- **Implementation Patterns:**
  - **Timeout & Fallback:** Set timeout for calls; return cache/default if failed.  
  - **Bulkhead Pattern:** Separate thread pool/queue per dependency; failure of B does not crash A.  
  - **Circuit Breaker:** Open circuit when dependency fails repeatedly to avoid cascade failure.  
  - **Rate Limiting / Throttling:** Limit requests to reduce load → system degrades "softly."

# Lab

- Do the task, lab test related in Vsf
- Research related paper and docs, curious

## Lab test

## Research related

- non functional
- uuidv7
- local cache - spring caffein
- kiro

- stress test
- java image layer, java vuner problem
- jvm optimized
