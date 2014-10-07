colab-coop
==========

Central repository for the colab.coop website.

sass requires (on Debian based Linux):
=========================
    $ sudo apt-get install ruby-dev
    $ sudo gem install compass --pre

install deps:
=============
    $ git clone https://github.com/colab-coop/colab-coop.git
    $ npm -g install

build site:
===========
    $ gulp

build site and run browsersync, watching for changes:
=====================================================
    $ gulp serve
