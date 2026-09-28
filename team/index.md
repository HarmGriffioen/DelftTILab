---
title: Team
nav:
  order: 3
  tooltip: About our team
---

# {% include icon.html icon="fa-solid fa-users" %}Meet the Team

Great research starts with great people. Here you’ll find all current and former members of our team, each bringing their own expertise, creativity, and passion to the **Delft Threat Intelligence Lab**.

{% include section.html %}

{% include list.html data="members" component="portrait" filter="role == 'principal-investigator'" %}
{% include list.html data="members" component="portrait" filter="role != 'principal-investigator' && role != 'advisor' && role != 'postdoc'" %}
{% include list.html data="members" component="portrait" filter="role == 'postdoc'" %}
{% include list.html data="members" component="portrait" filter="role == 'advisor'" %}
