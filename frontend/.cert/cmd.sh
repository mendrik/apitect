#!/usr/bin/env sh
openssl req -x509 -newkey rsa:4096 -sha256 -keyout server.key -out server.crt -days 365 -config cert.conf -new -nodes