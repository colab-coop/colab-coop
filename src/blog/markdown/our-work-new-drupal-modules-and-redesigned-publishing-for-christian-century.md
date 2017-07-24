---
title: "Our Work: New Drupal Modules and Redesigned Publishing for Christian Century"
summary: A new publishing platform for the online magazine Christian Century.
date: 2017-07-24
authors: [jeremy]
readfullarticle: our-work-new-drupal-modules-and-redesigned-publishing-for-christian-century
---

# Our Work: New Drupal Modules and Redesigned Publishing for Christian Century

In a recent project for Christian Century we redesigned and built a new publishing platform. Christian Century is a progressive magazine and publishing house committed to social justice through Christian faith initiatives. It received notoriety as the first major periodical to publish Martin Luther King, Jr.’s “Letter from Birmingham Jail.” CoLab is excited to have helped bring Christian Century’s publishing platform vision to life.

As an online publisher, the Christian Century had needs common to other media outlets:

* Beautiful, clean, readable content
* Fast page load that can scale to accommodate viral content
* Fine-grained access control for site editors, bloggers, and administrators
* Multiple options for image placement and sizing to accommodate found images, different text sizing, and mobile displays
* Perfect data migration for tens of thousands of entities
* Configurable ad placement that’s smart enough not to clutter or crowd the reading experience
* Book reviews for single or multiple books that look good in lists or on review pages
* Content that can be promoted, tagged, scheduled for publishing, associated with different authors, and displayed in listings

This new website features a host of speed improvements, user-interface upgrades, server-technology enhancements, and added backend functionality in the form of a Drupal upgrade, re-theme, and port of custom functionality.

Right out of the gate, the platform loads with lightning speed. Thanks to optimized code and a number of technologies (for the technically curious; Varnish, Solr, and memcache on an AWS instance), page loads were brought down to less than two seconds. As a quick point of reference, New York Times aims for under three seconds to complete loading of static content.

## BEFORE

<img src="/assets/img/blog/The_Christian_Century.jpg" class="center-element">

## AFTER

<img src="/assets/img/blog/The_Christian_Century___Thinking_Critically__Living_Faithfully_.jpg" class="center-element">

We also redesigned Christian Century’s layout from the ground up. The front page alone features nine possible layouts for content: “featured,” “listed,” or “small” views for content that either have an image, have no image, or have a reviewed work. Users can now view book covers or article images as retina-display optimized images at up to twice the resolution of standard monitors. This means that Christian Century’s crisp, font-driven interface looks sharp and consistent, regardless of where users read it.

In addition to speed and appearance upgrades, CoLab also created a number of tools to make life easier for Christian Century management. Staff now have a system to edit text, crop images, and choose other visual display options.

As part of this body of work, we released two new modules to the Drupal community, both of which are highly performant—integrating with page caching technologies like Varnish. The two modules work together but are separated, relying on their connection through the Drupal user permission API. The first module integrates with the Cambey & West subscription house, checking to see that users can access a page based on their print or electronic subscription status registered there. Next, the Content Paywall module gives that user full or truncated site content based on user access level. This is done via Javascript, so site content remains available to crawler bots but is not displayed to un-permissioned users. In all, we created 26 custom modules, including one for custom ad insertion in content as either a popup or for display inline.

CoLab drew from years of experience building technology platforms for social enterprises, foundations, and similar organizations committed to social and environmental impact. Our project managers, strategists, and designers took the time to understand the specific needs of online publishers. What’s more, our lead developer on this project is also a blogger who contributes regularly to online publications. This level of top-to-bottom understanding of requirements resulted in a polished online experience, going above and beyond industry standards.

We’d love your advice connecting with people who are interested in Drupal 8. Please [contact us](https://colab.coop/contact/) with your ideas for collaboration.

