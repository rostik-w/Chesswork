#!/bin/sh

python -m SimpleHTTPServer  2>&1 >> /var/log/chesswork.log &
