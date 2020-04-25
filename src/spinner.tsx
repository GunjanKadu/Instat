/**
 *
 * @Project :  ${Instat(Instant Chat)}
 * @CreatedBy ${Gunjan Kadu}
 * @Email  ${agunjan.kadu@gmail.com}
 * @Github //github.com/GunjanKadu
 * @date   2020-04-25 23:47:46
 *
 */

import React from 'react';
import { Loader, Dimmer } from 'semantic-ui-react';

const Spinner = () => {
  return (
    <Dimmer active>
      {' '}
      <Loader size='huge' content={'Preparing Chat'} />
    </Dimmer>
  );
};

export default Spinner;
