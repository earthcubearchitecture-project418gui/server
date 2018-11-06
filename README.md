### UCAR JSON-LD Validation

#### Design 

##### Preliminary - Stage 1 of validation
The validation process is driven by looping through every value on a JS obj (validator) that is of similar structure to that of the comparing JSON document. The JSON doc may have additional structure beyond the choosen validator, extra keys will not be checked. At the end of the validation, the end result is a JS obj (result obj) of the same structure as the validator. For every key on the validator, a corresponding key is looked up on the doc. If it contains the corresponding key, the validating function is called with the primative value present on the doc. If there is no key present, it is passed over and marked as false on the result obj. If it passes validation, the result obj is marked with true. If it failed validation, a human readable string with information about the error is stored.

##### Preliminary - Stage 2 of validation
Stage 2 will verify whole objects are valid. With the result obj from stage 1 representing which primative values were present, which were valid and which were invalid, a higher level of validation can take place. 