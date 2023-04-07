---
title: "Vermont Law School’s Drupal 8 Revamp: Using Region View Mode"
thumbnail: "https://colab.coop/assets/img/blog/drupal-8-vtlaw.jpg"
summary: "A deep dive into our latest Drupal 8 upgrade for Vermont Law School and the Region View mode."
date: 2017-12-14
authors: [jeff]
readfullarticle: vermont-law-schools-drupal-8-revamp-using-region-view-mode
---

# Vermont Law School’s Drupal 8 Revamp: Using Region View Mode

<img src="/assets/img/blog/drupal-8-vtlaw.jpg" class="center-element">

Recently, CoLab upgraded [Vermont Law School’s website to Drupal 8](https://www.vermontlaw.edu/). This post, which is intended for technical readers with an interest in open-source CMS platforms like Drupal, explains the layout technique we used for Vermont Law’s website.

For consistency, we’ll call the layout we’re working with “Region View Mode.” We decided to use [theme regions](https://www.drupal.org/docs/8/theming-drupal-8/adding-regions-to-a-theme), which are part of every theme in Drupal, to display variants of the current node. Using this technique allowed us to avoid complex layout systems like Panels. We use the technique most extensively on Basic Pages, although other content types rely on it as well.

Normally a node would be displayed in the Content region of the current theme. Blocks, which are generally unrelated content, are placed in other regions such as the sidebars, header, and footer.
In order to place parts of a node in multiple theme regions, we created additional node view modes for the Header, Content Top, Content Bottom, Content Aside, and Content theme regions. View modes are used to display the content from a given entity, like a node, in different ways. Think of them as display variants for a given node.

We then added blocks that display the current node, using one of the above [view modes](https://www.drupal.org/docs/8/api/entity-api/display-modes-view-modes-and-form-modes), in the corresponding theme region. (You can see them at /admin/structure/block.) In this case, we used the Entity view (Content) block type provided by the ctools module, but we could also have used a Views block display with a contextual filter set to use the current node id. 

With those settings in place, we could then place different fields from a given node in different theme regions by displaying them in the appropriate view mode. For example, on a person node, the expertise field is set to display in the Aside region view mode (/admin/structure/types/manage/person/display/aside_region) and hidden in the Default view mode (/admin/structure/types/manage/person/display) which is displayed in the main content region.

Overall, we found this use of the Region View Mode to be a highly efficient layout in our Drupal 8 revamp for Vermont Law School. If you have any questions or would like to discuss how CoLab can meet your Drupal needs, please [get in touch](https://www.colab.coop/contact/).

