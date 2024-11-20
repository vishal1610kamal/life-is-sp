import { instance } from '../common/liquibase/liquibase-config';
require('dotenv').config();

instance.update({})
  .then((output) => {
    console.log('Liquibase update completed successfully');
    console.log(output);
  })
  .catch(error => console.error('Liquibase update failed', error));

instance.tag({ tag: process.argv[2] })
  .then((output) => {
    console.log('Liquibase update completed successfully');
    console.log(output);
  })
  .catch(error => console.error('Liquibase update failed', error));
