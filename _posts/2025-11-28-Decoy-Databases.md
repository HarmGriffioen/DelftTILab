---
title: Decoy Databases
image: images/disk.jpg
author: Yuqian-Song
tags: Honeypots, Scanning, Databases, Malware
---

# Decoy Databases: Analyzing Attacks on Public Facing Databases

*Published on November 28th, 2025 by the Delft Threat Intelligence Lab*

As more of our social, commercial, and educational lives move online, databases have become critical to supporting digital services. However, their exposure to the Internet, often due to misconfiguration or vulnerabilities, makes them attractive targets for attackers. A recent study by researchers at the TU Delft Threat Intelligence Lab investigates real-world attacks on public-facing database management systems (DBMS) using honeypots.

## What Is a Honeypot?

A Honeypot is a emulated environment set to detect, deflect, or, in some manner, counteract attempts at unauthorized use of information systems.

## The Study

The team deployed **278 honeypots** over 20 days in March–April 2024 to monitor attacks targeting MySQL, MSSQL, PostgreSQL, and Redis databases. This setup included:

- **220 low-interaction honeypots**, which allowed the researchers to measure scanning and brute-force activity.
- **58 medium/high-interaction honeypots**, which enabled observation of active exploitation techniques.

## Key Findings

1. **Scanning Is Moderate but Persistent**: Around 3,000 unique IPs attempted to scan or access the honeypots, and brute-force login attempts were common.  
2. **Three Types of Exploitation**:
   - Direct attacks on the DBMS to manipulate or extract data.  
   - Ransom-driven attacks that copy or delete database contents.  
   - Use of the database as a pivot to compromise the underlying system.  
3. **DBMS-Specific Threats**: Attacks on databases are distinct from those targeting general Internet-facing systems, highlighting the need for focused defense strategies.

## Why This Matters

Databases are no longer just backend tools—they often accelerate front-end applications, reduce query response times, and enhance user engagement. Their critical role and the sensitive data they store make them high-value targets. This study provides:

- A detailed classification of attacker behavior into scanning, scouting, and exploiting.  
- Insights into adversary sequences and behavioral patterns.  
- The first publicly available dataset specifically focused on DBMS attacks.

By understanding these attack patterns, organizations can better defend their public-facing databases and mitigate risks before attackers succeed.

## Read the Paper

You can access the full publication on acm:

[Decoy Databases: Analyzing Attacks on Public Facing Databases](https://dl.acm.org/doi/abs/10.1145/3730567.3764481)

---

*This blog post summarizes research conducted by the Delft Threat Intelligence Lab. For a complete explanation of methods and results, refer to the original paper.*
