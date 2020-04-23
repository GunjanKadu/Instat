import React from 'react';
import { Progress } from 'semantic-ui-react';
import * as I from '../../../../Interfaces/Messages';

const ProgressBar = ({
  uploadState,
  percentUploaded,
}: I.IPropsProgressBar): JSX.Element =>
  uploadState && (
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
