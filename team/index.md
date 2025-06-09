---
title: Team
nav:
  order: 3
  tooltip: About our team
---

# {% include icon.html icon="fa-solid fa-users" %}Meet the Team

Great research starts with great people. Here you’ll find all current and former members of our team, each bringing their own expertise, creativity, and passion to the <span style="color:#00A6D6;"><b>Delft Threat Intelligence Lab</b></span>.

{% include section.html %}

{% include list.html data="members" component="portrait" filter="role == 'principal-investigator'" %}
{% include list.html data="members" component="portrait" filter="role != 'principal-investigator' && role != 'advisor'" %}
{% include list.html data="members" component="portrait" filter="role != 'principal-investigator' && role == 'advisor'" %}
