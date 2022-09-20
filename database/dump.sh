#!/bin/bash
for value in users documents enums tagsSettings nodeSettings
do
  mongoexport --uri="mongodb://localhost:27017/apitect?replicaSet=rs0" --collection=$value --forceTableScan --out=dummy/$value.list
done

