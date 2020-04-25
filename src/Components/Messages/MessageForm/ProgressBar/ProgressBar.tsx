/**
 *
 * @Project :  ${Instat(Instant Chat)}
 * @CreatedBy ${Gunjan Kadu}
 * @Email  ${agunjan.kadu@gmail.com}
 * @Github https://github.com/GunjanKadu/
 * @date   2020-04-25 23:45:19
 *
 */

import React from 'react';
import { Progress } from 'semantic-ui-react';
import * as I from '../../../../Interfaces/Messages';

const ProgressBar = ({
  uploadState,
  percentUploaded,
}: I.IPropsProgressBar): JSX.Element =>
  uploadState === 'uploading' && (
    <Progress
      className='progress_bar'
      percent={percentUploaded}
      progress
      indicating
      size='medium'
      inverted
    />
  );

export default ProgressBar;
