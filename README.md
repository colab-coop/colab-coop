![IMG_01102014_163453.png](/IMG_01102014_163453.png)


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
    $ npm -g install

build site:
===========
    $ gulp

build site and run browsersync, watching for changes:
=====================================================
    $ gulp serve
