/**
 *
 * @Project :  ${Instat(Instant Chat)}
 * @CreatedBy ${Gunjan Kadu}
 * @Email  ${agunjan.kadu@gmail.com}
 * @Github https://github.com/GunjanKadu/
 * @date   2020-04-25 23:45:28
 *
 */

import React, { Component } from 'react';
import { Header, Segment, Input, Icon } from 'semantic-ui-react';
import * as I from '../../../Interfaces/Messages';

//prettier-ignore
export default class MessagesHeader extends Component<I.IMessageHeaderProp,{}> {
  render() {
    const { channelName, numUniqueUsers, handleSearchChange,searchLoading,privateChannel,handleStar,isChannelStar} = this.props;
    return (
      <Segment clearing>
        {/* Channel Title */}
        <Header fluid='true' as='h2' floated='left' style={{ marginBottom: 0 }}>
          <span>
          {channelName}
           {!privateChannel&& (
           <Icon  onClick={handleStar} name={isChannelStar?"star":"star outline"} color={isChannelStar?"yellow":"black"} />
           )}
          </span>
          <Header.Subheader>{numUniqueUsers}</Header.Subheader>
        </Header>

        {/* Channel Search Input */}
        <Header floated='right'>
          <Input
            loading={searchLoading}
            onChange={handleSearchChange}
            size='mini'
            icon='search'
            name='searchTerm'
            placeholder='Search Messages'
          />
        </Header>
      </Segment>
    );
  }
}
