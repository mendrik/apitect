mongoexport -d apitect --collection=users --forceTableScan --out=dummy/users.json
mongoexport -d apitect --collection=documents --forceTableScan --out=dummy/documents.json
mongoexport -d apitect --collection=enums --forceTableScan --out=dummy/enums.json
mongoexport -d apitect --collection=tagsSettings --forceTableScan --out=dummy/tagsSettings.json
mongoexport -d apitect --collection=nodeSettings --forceTableScan --out=dummy/nodeSettings.json

