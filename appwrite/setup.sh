#!/bin/bash

tar -zcf hello_world.tar.gz hello_world

node setup.js

rm hello_world.tar.gz