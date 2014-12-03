colab-coop
==========

Central repository for the colab.coop website.

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
