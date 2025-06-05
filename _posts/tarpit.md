---
title: Can a Tarpit Clean Up the Internet?
image: images/tarpit.png
author: harm-griffioen
tags: botnets, tarpit, Mirai
---

# Can a Tarpit Clean Up the Internet? A Closer Look at Worm Containment Strategies

*Published on June 5, 2025 by the Delft Threat Intelligence Lab*

In the ever-evolving landscape of cybersecurity threats, Internet worms remain a persistent challenge. These self-replicating programs can spread rapidly across networks, exploiting vulnerabilities and causing widespread disruption. A recent study by researchers at TU Delft explores an intriguing question: Can we use "tarpits" to slow down or even halt the spread of these worms?

## What Is a Tarpit?

A tarpit is a network defense mechanism designed to intentionally delay or trap malicious connections. By responding slowly or not at all to certain network requests, a tarpit can tie up the resources of an attacking system, effectively slowing down its ability to spread malware or perform other malicious activities.

## The Study

The research, presented at the 2023 IEEE European Symposium on Security and Privacy Workshops, investigates the feasibility of tarpits as a defense against Internet worms. The team employed:

- **Simulations of Worm Propagation**: Modeling how different types of worms spread across networks.
- **Tarpit Implementations**: Deploying several tarpit strategies to assess their practical effectiveness.
- **Performance Metrics**: Measuring delay, resource consumption, and impact on worm containment.

## Key Findings

- **Effectiveness Depends on Context**: Tarpit success varies significantly depending on the worm's behavior and the network's structure.
- **Trade-offs in Performance**: Tarpits can consume system resources and introduce delays, potentially affecting legitimate traffic.
- **Supportive Role**: Tarpits are most effective as part of a layered security approach, complementing other tools like firewalls and detection systems.

## Why This Matters

This study revisits an underexplored method in cybersecurity and evaluates its practical viability in modern networks. While tarpits are not a silver bullet, they can be useful in specific scenarios, particularly when trying to slow down the early stages of a worm outbreak.

## Read the Paper

You can access the full publication on IEEE Xplore:

[Could you clean up the Internet with a Pit of Tar? Investigating tarpit feasibility on Internet worms](https://ieeexplore.ieee.org/document/10179467)

---

*This blog post summarizes research conducted by the Delft Threat Intelligence Lab. For a complete explanation of methods and results, refer to the original paper.*
