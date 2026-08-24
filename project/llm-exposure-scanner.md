---
layout: default
title: "LLM Exposure Scanner"
permalink: /projects/llm-exposure-scanner
---

# {% include icon.html icon="fa-solid fa-magnifying-glass" %}LLM Exposure Scanner

## Purpose of this research project

We scan the internet using data from Censys for exposed Large Language Model (LLM) framework instances. This is part of an ongoing academic security research project. We will **responsibly disclose** these exposures to the affected hosts so it can be fixed.

{%
  include alert.html
  type="info"
  content="All collected data is anonymized and handled securely. It is used only for research purposes and is never sold, published in identifiable form, or shared with third parties."
%}

## Opt-out

If you would prefer that your infrastructure is excluded from our scans, then please let us know which IP range(s) you'd like excluded, and we'll make sure they're left out of future scans.

{%
  include alert.html
  type="warning"
  content="To opt out of scanning, please contact us with your IP range at the email address below."
%}

{%
  include button.html
  type="email"
  text="INSERT_EMAIL@tudelft.nl"
  link="INSERT_EMAIL@tudelft.nl"
%}

## We'd love your feedback

If you received a notification from us or found our scans in your network, we kindly request your feedback: what caused the framework exposure(s), and whether you were already aware of it. This work is part of an ongoing security research project at **{Delft University of Technology}**, and your input will be very valuable in helping improve web security practices.

Your response will be treated confidentially and analyzed only in anonymized form.

Should you have any questions or need further assistance, please do not hesitate to contact us.

{%
  include button.html
  type="email"
  text="INSERT_EMAIL@tudelft.nl"
  link="INSERT_EMAIL@tudelft.nl"
%}
