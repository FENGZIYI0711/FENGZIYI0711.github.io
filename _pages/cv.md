---
layout: archive
title: "CV"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

{% include base_path %}

Education
======
* B.S. in Information Security, University of Science and Technology Beijing (USTB), 2027.07

Work experience
======
  
Skills
======
* **Programming Languages:** Python, C/C++, Verilog
* **Cybersecurity**
  * Web Security & Penetration Testing
  * Cryptography & Protocol Analysis
  * Reverse Engineering & Binary Exploitation
* **Tools & Frameworks:** Linux, Git, Docker, Burp Suite, GDB/Pwndbg

Publications
======
  <ul>{% for post in site.publications reversed %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>
  
Talks
======
  <ul>{% for post in site.talks reversed %}
    {% include archive-single-talk-cv.html  %}
  {% endfor %}</ul>
  
Teaching
======
  <ul>{% for post in site.teaching reversed %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>
  
Service and leadership
======
* Currently signed in to 43 different slack teams
