## Strategies

- Planning
- Cleaning
- Code + Schema review
- Backup + Recovery strategy
- Testing + validation
- Verify performance
- Monitoring + Logging
- Post-migration support: support team behind the scene is ready + enough documents

## Cause downtime

- Data volumn
- Network issues
- Data structure changes
- Code changes
- Data cleaning and transformation
- Different database version or configuration
- From backup and restore processes

## How achieve zero downtime

### Offline copy migration

- Down application, copy from old to new cloud database, then bring application back online.
- Simple, easy, safe
- Con: don't know correct the amount of downtime

### Master/Read replica switch migration

- Create a replica Read
- After that, downtime a little bit and switch from current Master into Read, and make it become Master.

### Master/Master migration

- Greatest risk.
- No downtime
- Duplicate Master, set bi-directional synchronization between the two masters
- In fact, to better control migration, need to run 2 apps in Cloud, and move the traffic.
