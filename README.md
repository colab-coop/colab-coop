colab-coop
==========

Central repository for the colab.coop website.

Note: If you are a colab developer, this is but one piece of the larger colab-coop site puzzle. In addition to this, the main site repo, you will want to install several other programs on your local setup: colab-coop-form-api, which handles contact-form submissions, colab-coop-editor, which is a web-based editor for the site, and colab-coop-api, which is what the editor connects to to edit files on the site.

clone the repo
==============
    $ git clone https://github.com/colab-coop/colab-coop.git

sass requires (on Debian based Linux):
======================================
    $ sudo apt-get install ruby-dev
    $ sudo gem install compass --pre

install deps (requires npm):
============================
    $ npm install

build site:
===========
    $ gulp

watch source and auto re-build:
===============================
    $ gulp watch

run browsersync (serves, watches changes, autoreloads, syncs connected browsers):
=================================================================================
    $ npm run serve
    
auto-pull from github once every minute
=======================================
    $ npm run poll
