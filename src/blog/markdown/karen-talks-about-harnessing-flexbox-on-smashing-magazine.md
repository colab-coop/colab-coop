---
title: "Karen Talks About Harnessing Flexbox On Smashing Magazine"
summary: "One of our favorite front-end developers dives deep into CSS3 Flexible Box, sharing solutions to various common use cases for modern web apps."
date: 2015-03-03
authors: [ralph]
readfullarticle: karen-talks-about-harnessing-flexbox-on-smashing-magazine
---

# Karen Talks About Harnessing Flexbox On Smashing Magazine

<a href="http://www.smashingmagazine.com/2015/03/02/harnessing-flexbox-for-todays-web-apps/"><img src="/assets/img/blog/flexbox_demo.png" class="center-element border-all"></a>

 Ever struggle with CSS to create vertical centering or equal heights on a web app layout? We have. Thankfully our collaborator and front-end developer Karen Menezes has some answers. She's published a sweet and fairly in depth <a href="http://www.smashingmagazine.com/2015/03/02/harnessing-flexbox-for-todays-web-apps/">article on Smashing Magazine</a> looking into flexbox, a simple and accommodating solution for just such fuss. It's chock-full of real world use cases and info on browser support. 

 Here's a sample:
 
> ###A. VISUAL ORDER INDEPENDENCE WITH FLEX DIRECTION

> *Use case:* I have a sidebar positioned to the right of the main content section. On small screens, I want the sidebar to be at the top of the main content, reversing the order.

> *Issue:* I don’t want to use JavaScript or a CSS hack to change the visual order.

> *Discussion:* Flexbox is agnostic about the order in a layout. This makes it a miraculous tool for responsive layouts. We can do this in two ways: using the flex-direction property or the order property. Let’s look at the first option here.

> *Solution:* Let’s build the layout with the sidebar as the first section in our markup. This is logical for two reasons: It adheres to the principle of a mobile-first layout, and it is beneficial to screen readers because the sidebar links are first in the source order. Let’s declare flex-direction: column on the parent (because row is the default). In our media query for large screens, we’ll change flex-direction to row-reverse, which solves our issue.

> As a bonus, we’ll throw in a fixed-width sidebar (which is always 180 pixels on large screens and full width on mobile).

 <p data-height="372" data-theme-id="0" data-slug-hash="JoYoRE" data-default-tab="result" data-user="imohkay" class='codepen'>See the Pen <a href='http://codepen.io/imohkay/pen/JoYoRE/'>Flexbox: Sidebar with source order independence using flex-direction</a> by Karen Menezes (<a href='http://codepen.io/imohkay'>@imohkay</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

You can read the full article over at <a href="http://www.smashingmagazine.com/2015/03/02/harnessing-flexbox-for-todays-web-apps/">Smashing Mag</a>.