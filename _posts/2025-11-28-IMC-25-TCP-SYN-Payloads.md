---
title: ACM IMC 2025 - TCP SYN Payloads
image: images/imc-2025-squad.jpeg
author: dario-ferrero
tags: conference, network-telescope, scanning
---

# Highlights from the 2025 ACM IMC Conference

*Published on December 1st, 2025 by the Delft Threat Intelligence Lab*

During the week of October 27th to the 31st, the team attended the 2025 ACM Internet Measurement Conference in Madison, WI.
Yuqian presented his [full paper on Decoy Databases](http://delftintellab.com/2025/11/28/Decoy-Databases.html) and Dario presented his short paper on TCP SYN Payloads.

The whole event has been a formative experience: we were able to attend high-level presentations and to learn about several research directions in the field of Internet Measurements. The feeling of community was strong over the course of the conference, and we hope to be back in the future!


## Have you SYN What I See? Analyzing TCP SYN Payloads in the Wild

The paper addresses a form of unsolicited Internet traffic yet unexplored by the literature, that is TCP SYN packets carrying an application payload. Over two years of data collected by our Network Telescope, we record over 200 million of these events and provide a complete characterization of their content while attempting to explain the objectives behind this anomalous traffic.


## Key Findings

1. **Traffic is attributable to Internet Scans**: we observe for almost all traffic well-known fingerprints for scanning tools and irregular header values for TCP SYNs, indicating that their origin is to be attributed to intentional scanning and not misconfigurations.
2. **OS Fingerprinting can be ruled out as an explanation**: we try to determine if these scans are Operating System Fingerprinting attempts. We do so by setting up a virtualized environment and replaying subsets of TCP SYN + Payload data against multiple OS versions, without finding any behavioral difference between the tested set.
3. **HTTP GETs are most common, but Zyxel scans raise concerns**: the application layer payloads show that more than three quarters are simple HTTP GET scans attributable to research scans. On the other hand, we record several scans targeting TCP port 0 and Zyxel infrastructure.



## Why this matters

This type of event is known to trigger interference by middleboxes and firewalls, and while previous work has hinted to the presence of this traffic "in the wild", to this day no major work has provided a full overview of the requests it contains. While we observe that the majority of these  can be related to studies on Internet Censorship, a significant share can be linked to suspicious reconnaissance targeting Zyxel equipment. Through the vantage point of our large Network Telescope we provide a view as complete as possible, but still warn to keep this traffic under observation.


## Relevant links and references

You can access the full publication on the ACM Digital Library:
- [Have you SYN What I See? Analyzing TCP SYN Payloads in the Wild](https://dl.acm.org/doi/10.1145/3730567.3764498)


---

*This blog post summarizes research conducted by the Delft Threat Intelligence Lab. For a complete explanation of methods and results, refer to the original papers.*
