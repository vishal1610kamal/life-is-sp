require('dotenv').config();
import { instance } from '../common/liquibase/liquibase-config';

instance.rollbackCount({ value: parseInt(process.argv[2]) })
  .then((output) => {
    console.log('Liquibase update completed successfully');
    console.log(output);
  })
  .catch(error => console.error('Liquibase update failed', error));
