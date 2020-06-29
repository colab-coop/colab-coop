---
title: Remote Collaboration "Smells"
summary: Identifying and acting on code smells is an essential skill in collaborative software development as they often signify a problem in the system. Learn about what these signals are in the context of collaboration and how to avoid smelly shared work.
date: 2020-06-29
authors: [ethan]
readfullarticle: remote-collaboration-smells
---

<img src="/assets/img/blog/collaboration-smells.png", class="center-element" alt="collaboration smells">

# Remote Collaboration "Smells"

## 1. Smelly Collaboration

### How Developers Smell

Non-developers might not think much about it, but collaboratively writing software is all about smell. Not smell as in “I’ve been stuck in the house for the past week on quarantine and should probably change my socks” or “I think I remember that delicious sensation from the spice shop down the street.” I’m talking about smells like “That’s a whiff of something familiar, I can’t quite place it, but usually that faint trace in the air means that there’s a problem I’ve dealt with before.”

In the early 90s, agile software development pioneers Kent Beck, Martin Fowler and others developed a term for these intuitions: “code smells.” As Martin Fowler defines it on his [incomparable blog](https://martinfowler.com/bliki/CodeSmell.html): _“[a] code smell is a surface indication that usually corresponds to a deeper problem in the system.”_ Examples of code smells are “feature envy” (when a chunk of code tries to do everything itself instead of using existing code written elsewhere) or “uncommunicative names” (names of variables and functions that don’t make it clear to other developers what’s going on).

Identifying and acting on code smells is an essential skill in collaborative software development. Code smells are the symptom of accrued technical debt that needs to be paid off, the evidence that a developer may not fully understand the technology or domain model, the emergent indications of strain that require a rethinking of a system’s underlying architecture, or even canaries in the coal mine that the fundamental premises of the application’s core purpose and features may be off.

### Collaboration Smells

But the idea of “smells” applies to any complex system. Using smell is a tool for finding and fixing issues with any collaborative system that we can only see one facet at a time. Smells are heuristics that let us talk about dynamic, nonlinear systems in a way that is both actionable and shared. They enable us to handle the unknown together and shape the fog of collaboration into something workable and clearly structured.

At CoLab we use smells throughout our collaborative work: in our meetings, our methodologies, our reviews, our retrospectives, everywhere. Smells connect the bumps in the road of our collaboration to tangible strategies for working better together.

## 2. Virtual Meeting Smells and What To Do About Them

Here are some meeting smells and some facilitation practices to ward them off:

* **Room of lurkers**: Throughout the entire meeting only one or two people speak, and there is dead silence when opinions are sought. 
 * Sociocracy rounds (try our “virtual conch” approach).
 * Video on! Request folks to pause what they are doing. If people are multitasking, do we need to reschedule?
 * Flash retro: speak the problem out loud and solicit reasons
* **The Pile-On**: Folks are constantly interrupting, talking over one another, or it’s not clear who should speak when.
 * Take stack! Nominate a stack taker. We use a group chat program and “o/” to indicate that we are raising our hands.
 * Use progressive stack: look for folks who have not spoken in a while, prioritize and invite their voices
 * 1,2,3,me: if you are someone who often jumps in early and often, step back for the first few rounds
* **The Never-ending Agenda Topic**: For some reason a topic just won’t end; it goes on and on and on and on.
 * Ask “What are we really talking about here?” to surface the reason for people’s investment in the problem
 * Step up, step back: ask for those who have not spoken yet to give their perspective (and, implicitly, for others to step back)
 * Move to agenda conversation: from scrum...does this need to move to a separate meeting?
 * Request framing as 
 * Cameras on!
* **The Discussion with No Action Items**: Folks in the meeting can identify lots of problems and have lots of ideas, but there’s no clear path forward.
 * Prioritize decisions
 * Create a shared document that everyone can see and edit
 * Have someone take notes
 * No later than 2/3rds of the way through the meeting, stop the general discussion and go back through the problems and ideas that have been noted and create action items with a DRI (directly responsible individual) for each (and if possible, deadlines)
* **Waiting for your turn to speak**: It’s so tempting to hold onto that idea we have, the responses we’ll expect, the effect it will have. We think about it and think about it and then it’s our turn to talk, and aahhh.. what sweet release. However we’ve now undermined the entire point of the meeting: communication. In being so focused on what we want to say, we’ve not really been listening to what others are saying. And if they’ve been doing the same thing, then the whole meeting could have been everyone just talking to a wall.

## 3. Teamwork Smells... and What To Do About Them

* Unresponsiveness
* **No Clear DRI**: Unless there is a known Directly Responsible Individual to take charge of an actionable item, it very likely won’t get done. One of the dangers of scaling enhanced collaborative environments is the feeling that “someone else will take care of that.” And the more people there are, the greater the danger of this! So always assign a DRI to a task.
* **Lack of energy**: We’ve all felt the exhilaration of being “in the zone” with your team, getting things done left and right, seeing success after productive success. Naturally, we’ve all also seen the opposite. Nothing seems to be working, things seem hopeless or stuck or moving at a snail’s pace. There’s no sure-fire way to prevent these lulls, but generally all it takes to pull out of it is at least one or two people to get hyped. That energy can be infectious.

## 4. Personal Care Smells... and What To Do About Them

* **Overwhelmed**: It’s easy to feel overwhelmed in a remote-work situation. Without people around you, it’s easy to get distracted and lose track of things. This leads to feeling lost about what to do next. As with any case of being overwhelmed, the best thing to do is to just get started on one task. If that task itself seems overwhelming, just get started on one small aspect of that task, say 5-minutes worth. The satisfaction of getting at least something done should help build momentum.
* **Anxiety**: Related to being overwhelmed is feeling anxious about the future. At CoLab, we have a culture of meditation (a variety of approaches), and we highly recommend it as a solution for anxiety. It is a proven method of reducing stress and calming the mind. Give it a shot!

## Appendix: A Glossary of Remote Collaboration Techniques

* **“Pass the Conch”** for Virtual Rounds: each person calls the next to go
 * Idea: try to call on someone who talks less frequently or is from a demographic that is often under-represented (e.g. make sure that the women in your group aren’t all chosen last).
* **Stack taking**: “first in first out” talking queue
 * “o/” easy stack in chat
 * Stack bot (coming soon)
 * Progres
* Collaborative Notes
* DRI: Directly Responsible Individual

For more information on this topic, please attend CoLab’s webinar, Web Security for Activists and Organizers on Thursday, July 9, at 11am EDT. Special guest Michael Loadenthal will discuss his experience as an anarchist activist dealing with political repression in online spaces and provide advice for people and organizations working remotely. Registration is free and all are welcome!

<img src="/assets/img/blog/webinar.jpg" class="center-element" alt="Web Security Webinar July 9th 2020 11:00AM - 12:30PM EST with special guest Michael Loadenthal">

<div style="text-align: center;">
  <a href="https://www.eventbrite.com/e/web-security-for-activists-and-organizers-with-colab-and-michael-loadenthal-tickets-109390205048)" class="center-element button--brand-outline color-red">More Info</a>
</div>

<div></div>
