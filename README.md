### UCAR JSON-LD Validation

#### Design 

##### Preliminary - Stage 1 of validation
The validation process is driven by looping through every value on a JS obj (validator) that is of similar structure to that of the comparing JSON document. The JSON doc may have additional structure beyond the choosen validator, extra keys will not be checked. At the end of the validation, the end result is a JS obj (result obj) of the same structure as the validator. For every key on the validator, a corresponding key is looked up on the doc. If it contains the corresponding key, the validating function is called with the primative value present on the doc. If there is no key present, it is passed over and marked as false on the result obj. If it passes validation, the result obj is marked with true. If it failed validation, a human readable string with information about the error is stored.

##### Preliminary - Stage 2 of validation
Stage 2 will verify whole objects are valid. With the result obj from stage 1 representing which primative values were present, which were valid and which were invalid, a higher level of validation can take place. 

##### Frequent commands

ajv  validate --all-errors -c .\src\back\ajv-cli.js -s src\schema\dataset.json -d src\share\jsonld_examples\datasets\bcodmo_dataset.json > dataset_errors.txt 2>&1

ajv  validate --all-errors -c .\src\back\ajv-cli.js -s src\schema\organization.json -d src\share\jsonld_examples\organizations\bcodmo_org.json > organization_errors.txt 2>&1


-  cmd
rsync -r -a -u -P -e "ssh" --rsync-path="sudo rsync" * alexm@earthcube.isti.com:/var/jsonld-ucar-isti


- systemd setup
https://stackoverflow.com/questions/4018154/how-do-i-run-a-node-js-app-as-a-background-service/29042953#29042953
https://www.digitalocean.com/community/tutorials/how-to-use-systemctl-to-manage-systemd-services-and-units

- Future 
https://medium.com/@francoisromain/vps-deploy-with-git-fea605f1303b