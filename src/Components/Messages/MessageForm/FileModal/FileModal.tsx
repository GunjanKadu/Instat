/**
 *
 * @Project :  ${Instat(Instant Chat)}
 * @CreatedBy ${Gunjan Kadu}
 * @Email  ${agunjan.kadu@gmail.com}
 * @Github https://github.com/GunjanKadu/
 * @date   2020-04-25 23:45:13
 *
 */

import React, { Component } from 'react';
import { Modal, Input, Button, Icon } from 'semantic-ui-react';
import mime from 'mime-types';
import * as I from '../../../../Interfaces/Messages';

export default class FileModal extends Component<
  I.IFileModalProps,
  I.IFileModalState
> {
  state: I.IFileModalState = {
    file: null,
    authorized: ['image/jpeg', 'image/png'],
  };
  addFile = (event: any) => {
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      this.setState({ file: file });
    }
  };
  sendFile = () => {
    const { file } = this.state;
    const { uploadFile, closeModal } = this.props;
    if (file !== null) {
      if (this.isAuthorized(file.name)) {
        const metaData: I.IFileModalMetaData = {
          contentType: mime.lookup(file.name).toString(),
        };
        uploadFile(file, metaData);
        closeModal();
        this.clearFile();
      }
    }
  };

  isAuthorized = (fileName: string): boolean =>
    this.state.authorized.includes(mime.lookup(fileName).toString());

  clearFile = () => this.setState({ file: null });

  render() {
    const { modal, closeModal } = this.props;
    return (
      <Modal basic open={modal} onClose={closeModal}>
        <Modal.Header>Select An Image File</Modal.Header>
        <Modal.Content>
          <Input
            fluid
            label='File type:jpg,png'
            name='file'
            type='file'
            onChange={this.addFile}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' inverted onClick={this.sendFile}>
            <Icon name='checkmark' /> Send
          </Button>
          <Button color='red' inverted onClick={closeModal}>
            <Icon name='remove' /> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
