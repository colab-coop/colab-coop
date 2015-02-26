---
title: "Does this look like a Squarespace?"
summary: "Lessons on getting started using the developer mode, template-driven JSON, and CSS preprocessors on Squarespace."
date: 2015-02-26
authors: [jenn]
readfullarticle: does-this-look-like-a-squarespace
---

# Does this look like a Squarespace?

A site on Squarespace doesn't have to look like a Squarespace.

In a recent episode of [Shoptalk](http://shoptalkshow.com/episodes/151-emily-lewis-lea-alcantara/), the phrase <em>I want a WordPress</em> was used to illustrate the ubiquity of the WordPress platform.

Squarespace and WordPress are different platforms with similar notoriety. There was a time when you knew a WordPress theme by sight &mdash; the telltale sidebar, the blogroll links. Similarly, many of us who look at websites all day long can spot a Squarespace site from across the room.

On a recent <a href="/blog/site-launched-mama-hope">custom Squarespace development</a> project, we needed the best of both worlds: a one-of-a-kind design that also could be easily managed using the Squarespace editor.

If you've never seen the Squarespace editor, this is what it looks like:

<img src="/assets/img/blog/2015-03-12_1.gif" alt="Squarespace editor" class="center-element border-all">

Right?

Turns out, breaking out of a Squarespace template (and keeping the awesome editor) is pretty straightforward.

Here's how we did it.

## Turn on developer mode

Turn on developer mode in the Squarespace admin panel. This gives you access to your site's git repository, including a  helpful panel for reviewing commit history and syntax errors:

<img src="/assets/img/blog/2015-03-12_2.png" alt="Squarespace git history and syntax errors" class="center-element border-all">

## Use the boilerplate template

WordPress has Bones, Drupal has Zen, and Squarespace has <a href="http://base-template.squarespace.com/">Base</a>, an ideal boilerplate for a custom design.

## Study system templates

At the time of writing, Squarespace has 36 system templates: 22 parent templates and 14 variants.

This handy <a href="http://www.usingmyhead.com/squarespace-7-template-comparison-chart/">Squarespace template comparison chart</a> reveals that variants are actually not unique from their parent template. Bedford and Anya may be styled differently, but they share the same codebase. We found <a href="http://bedford-demo.squarespace.com/">Bedford</a> and <a href="http://pacific-demo.squarespace.com/">Pacific</a> to be the most versatile parent templates.

In addition to reading the <a href="https://developers.squarespace.com/">developer docs</a>, we learned a lot by studying system templates. To do this, install a template in the admin panel, turn on developer mode, and check out the git repository.

## Grab JSON data

The JSON data returned to every page and block can be accessed via a URL or  <a href="http://jsont.squarespace.com/">JSON-T</a> in template files. You can also log the JSON formatter to the console, which is useful for debugging.

## Write LESS

Well, sort of. Variables and mixins, yes. <code>@import</code>, no. You'll need to list every LESS file individually in the template configuration file.

It's worth noting that LESS doesn't have advanced control directives or the <code>@extend</code> feature of Sass. You can't write the same <code>@if</code>, <code>@for</code>, <code>@each</code> or <code>@while</code> loops in LESS. Still, being able to write in a preprocessor with zero setup is pretty nice.

LESS is even supported in the Squarespace admin panel. In other words, you don't have to turn on developer mode to write LESS.

## Add options to the style editor

The style editor provides an interface for making presentational changes like colors, fonts, and background images.

You can add options to the style editor by including a JSON object directly in your LESS file, which maps to a LESS variable.

## Use Markdown for custom blocks

One of the biggest downsides of Squarespace is the lack of support for custom blocks or overriding system blocks. For now, you can use the Markdown block. Since <a href="http://daringfireball.net/projects/markdown/syntax#html">Markdown supports inline HTML</a>, it doubles as a custom block.

## Summary

Turn on developer mode, use the boilerplate template, learn some JSON-T, and write some LESS.

We haven't even covered template partials, open block areas, or locking layouts. There's even potential to use frameworks like <a href="http://emberjs.com/">Ember</a>, <a href="http://backbonejs.org/">Backbone</a> or <a href="http://angularjs.org/">Angular</a> to connect with external databases.

We liked the challenge of building a Squarespace that doesn't look like a Squarespace. Have you done something similar? <a href="http://twitter.com/colabcoop">Tell us how you did it</a>.
