---
title: "Installing Solr 5 for Drupal Apachesolr on OS X with Homebrew"
summary: "First in a series of technical posts at CoLab!"
date: 2017-03-17
authors: [jeremy]
category: drupal
readfullarticle: installing-solr-5-for-drupal-apachesolr-on-os-x-with-homebrew
---

# Installing Solr 5 for Drupal Apachesolr on OS X with Homebrew

> Welcome to the first of a new series of CoLab blog posts exploring the technical inner workings of the CoLab Cooperative. Enjoy!

Apache Solr is the Drupal community’s standard approach for scaling and optimizing features that rely on SQL fulltext queries, such as like search results, related content lists, and similarity rankings. However, it’s often difficult to test this functionality outside the production server because Solr is rather idiosyncratic in its installation: it’s difficult to figure out where to place a Solr core or what version of Solr can safely be used with which drupal module.

Here are my notes for the installation of Solr 5 via homebrew for use with Drupal [apachesolr](https://www.drupal.org/project/apachesolr).

<b>Note:</b> there are two different solr modules, apache_solr and [search_api_solr](https://www.drupal.org/project/search_api_solr). We are installing for apache_solr.

There is a good but slightly confusing [introduction to the topic](https://www.drupal.org/node/2502221) on drupal.org.

One common gotcha is Solr version issues. Homebrew’s standard “solr” formula installs Solr v6, but apachesolr requires v5.5. If you've already installed the standard “solr” formula you’ll need to uninstall it with:

`brew unlink solr`

The latest stable version of Solr 5x as of writing is 5.5. See [here](http://archive.apache.org/dist/lucene/solr/). There is a separate formula for installing Solr 5.5, and so this is where we start:

`brew install solr55`

The next step is to set up a Solr “core” for our Drupal integration. You should read the [introductory article](https://www.drupal.org/node/2502221) to understand more about what cores are and what they do. In brief, they are search and indexing environments, and we need to create one specific to our Drupal installation.

It was somewhat hard to figure out where to put the conf files. First, start from the right directory, `/usr/local/opt/solr/server/solr`:

    $ pwd
    /usr/local/opt/solr/server/solr
    $ mkdir drupal
    $ cd drupal/
    $ mkdir conf

In this case we've created a core named “drupal”, with a conf dir at `/usr/local/opt/solr/server/solr/drupal/conf`. 

Once we’ve set up a core for our Drupal integration, we need to configure Drupal to use our Solr instance. First we’ll install the apachesolr module. Only the dev version of apachesolr includes conf files necessary for Solr 5x as of January 10th, 2017. See [this issue](https://www.drupal.org/node/2502221) for reference.

`drush dl apachesolr-7.x-1.x-dev && drush en apachesolr`

Next, we import the default Drupal Solr configuration for our core by copying the files from `sites/all/modules/contrib/apachesolr/solr-conf/solr-5.x` to `/usr/local/opt/solr/server/solr/drupal/conf`

From docroot:

`cp sites/all/modules/contrib/apachesolr/solr-conf/solr-5.x/* /usr/local/opt/solr/server/solr/drupal/conf/`

Then we start Solr:

`solr start`

This will start solr on port 8983. The URL for the GUI is http://localhost:8983/solr

Now create a new solr core for drupal using the config files we copied over:

`solr create -c drupal -d /usr/local/opt/solr/server/solr/drupal/conf`

The Drupal config settings for apachesolr module are here: `admin/config/search/apachesolr/settings/solr/edit`

The proper server URL for me given the above was:
http://localhost:8983/solr/drupal

Aaaand WE'RE IN!

Now you can integrate solr according to the readme in the [apachesolr](https://www.drupal.org/project/apachesolr) module. 