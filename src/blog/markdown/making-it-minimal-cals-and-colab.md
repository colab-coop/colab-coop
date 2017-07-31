---
title: "Making it Minimal: CALS and CoLab"
summary: "CALS approached CoLab with a need to upgrade one of the primary themes used for the front-end display of departmental information."
date: 2017-07-31
authors: [doug]
readfullarticle: making-it-minimal-cals-and-colab
---

<img src="/assets/img/blog/cals.gif" class="center-element" alt="responsive design">

# Our work: Making it Minimal

CoLab is excited to share the results of its recent collaboration with [Cornell University’s College of Agricultural and Life Sciences](https://cals.cornell.edu/), or CALS. CALS approached CoLab with a need to upgrade one of the primary themes used for the front-end display of departmental information. CALS hosts departments ranging from Animal Science to Biological and Environmental Engineering to Communication, Entomology, Food Science, and Natural Resources. 

Each of these departmental resources contains vital information pertaining to undergraduate and graduate majors, a faculty and graduate student directory, research page, faculty accomplishments and awards, and various departmental news and events. The goal of CALS’s collaboration with CoLab was to make the front-end theme used for these pages responsive, for it to change dynamically with different browsers, devices, and window sizes.

Such a task sounds relatively straightforward. Yet given the fact that CALS runs more than 60 sites with various dependencies on a single Acquia instance, there were some important considerations to keep in mind. Additionally, numerous staff members, including system administrators, use the system, and internal developers would also need to be able to update and configure the system with relative ease. 

Fidelity was also a consideration. How consistent does a page need to look, for instance, between the current designs and the final responsive site? In order to answer such questions the collaboration with CoLab consisted of a high level of client feedback and review. “This works for me, this doesn’t,” was a phrase often overheard during scrums.

Overall, CoLab’s approach to the task of developing the departmental theme revolved around one consistent theme: minimalism. We kept the codebase as lean, lightweight, and legible as possible. Documentation was complete and thorough, but not overwhelming. CALS was able to easily update styles, which were built upon a modern CSS framework with contemporary typography (with “out-of-the-box” spacing standards), along with page behaviors by following our intuitively marked up stack. In fact, as CoLab committed code, much of the documentation came with it, in the codebase itself, to which of course CALS had consistent access.

As for the working process, firstly the requirements were fully componentized. Then, using Cornell’s own Git repository, each requirement was executed and QA’ed individually. In terms of DevOps, CALS used their own staging server instance, and from there, they pushed it production when they felt is was ready. (CoLab could push to their staging, but CALS ultimately pushed to production.)

In addition to the department theme codebase including documentation, CoLab also administered administrator and developer training. Ultimately, the training was as important a component as the codebase: both admins and developers needed to feel confident and ready to work with theme in a flexible and intuitive manner. In the end, the project was an overwhelming success for CoLab, and the beginning of a much-valued collaboration with the team at CALS.