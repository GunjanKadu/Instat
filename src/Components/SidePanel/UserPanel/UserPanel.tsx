/**
 *
 * @Project :  ${Instat(Instant Chat)}
 * @CreatedBy ${Gunjan Kadu}
 * @Email  ${agunjan.kadu@gmail.com}
 * @Github https://github.com/GunjanKadu//
 * @date   2020-04-25 23:46:15
 *
 */

import React, { Component } from 'react';
import {
  Grid,
  Header,
  Icon,
  Dropdown,
  Image,
  Modal,
  Input,
  GridColumn,
  Button,
} from 'semantic-ui-react';
import firebase from '../../../firebase';
import * as I from '../../../Interfaces/SidePanel';
import AvatarEditor from 'react-avatar-editor';

class UserPanel extends Component<I.IUserPanelProps, I.IUserPanelState> {
  private avatarEditor: AvatarEditor;

  state: I.IUserPanelState = {
    user: this.props.currentUser,
    modal: false,
    previewImage: '',
    croppedImage: '',
    blob: '',
    storageRef: firebase.storage().ref(),
    userRef: firebase.auth().currentUser,
    metadata: { contentType: 'image/jpeg' },
    usersRef: firebase.database().ref('users'),
    uploadedCroppedImage: '',
  };
  openModal = () => this.setState({ modal: true });

  closeModal = () => this.setState({ modal: false });

  dropDownOption = () => [
    {
      text: (
        <span>
          Signed in as <strong>{this.state.user?.displayName}</strong>
        </span>
      ),
      key: 'user',
      disabled: true,
    },
    {
      text: <span onClick={this.openModal}>Change Avatar</span>,
      key: 'avatar',
    },
    {
      text: <span onClick={this.handleSignout}>Sign Out</span>,
      key: 'signout',
    },
  ];
  handleChange = (event: any) => {
    console.log(event);
    console.log(event.target.files);
    const file = event.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.addEventListener('load', () => {
        this.setState({ previewImage: reader.result });
      });
    }
  };
  handleSignout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log('signed out!'));
  };
  handleCropImage = () => {
    if (this.avatarEditor) {
      console.log(this.avatarEditor);
      this.avatarEditor.getImageScaledToCanvas().toBlob((blob: any) => {
        let imageUrl = URL.createObjectURL(blob);
        this.setState({ croppedImage: imageUrl, blob: blob });
      });
    }
  };
  uploadCroppedImage = () => {
    const { storageRef, userRef, blob, metadata } = this.state;
    storageRef
      .child(`avatars/user-${userRef.uid}`)
      .put(blob, metadata)
      .then((snap) => {
        snap.ref.getDownloadURL().then((downloadURL) => {
          this.setState({ uploadedCroppedImage: downloadURL }, () =>
            this.changeAvatar()
          );
        });
      });
  };
  changeAvatar = () => {
    this.state.userRef
      .updateProfile({ photoURL: this.state.uploadedCroppedImage })
      .then(() => {
        console.log('Photo Url Updated');
        this.closeModal();
      })
      .catch((err: Error) => {
        console.log(err);
      });

    this.state.usersRef
      .child(this.state.user.uid)
      .update({ avatar: this.state.uploadedCroppedImage })
      .then(() => {
        console.log('user Avatar Updated');
      })
      .catch((err: Error) => {
        console.log(err);
      });
  };
  render() {
    const { user, modal, previewImage, croppedImage } = this.state;
    const { primaryColor } = this.props;
    return (
      <Grid style={{ background: primaryColor }}>
        <Grid.Column>
          <Grid.Row style={{ padding: '1.2em', margin: 0 }}>
            {/* Main Application Header */}
            <Header inverted floated='left' as='h2'>
              <Icon name='paper plane' />
              <Header.Content>Instat</Header.Content>
            </Header>
            {/* User DropDown */}
            <Header style={{ padding: '0.25em' }} as='h4' inverted>
              <Dropdown
                trigger={
                  <span>
                    <Image src={user?.photoURL} spaced='right' avatar />
                    {this.state.user?.displayName}
                  </span>
                }
                options={this.dropDownOption()}
              />
            </Header>
          </Grid.Row>
          {/* Change user avatar modal */}
          <Modal basic open={modal} onClose={this.closeModal}>
            <Modal.Header>Change Avatar</Modal.Header>
            <Modal.Content>
              <Input
                onChange={this.handleChange}
                fluid
                type='file'
                label='New Avatar'
                name='previewImage'
              />
              <Grid centered stackable columns={2}>
                <Grid.Row centered>
                  <GridColumn className='ui center aligned grid'>
                    {previewImage && (
                      <AvatarEditor
                        ref={(node) => (this.avatarEditor = node)}
                        image={previewImage}
                        width={120}
                        height={120}
                        border={50}
                        scale={1.2}
                      />
                    )}
                  </GridColumn>
                  <GridColumn>
                    {croppedImage && (
                      <Image
                        style={{ margin: '3.5em auto' }}
                        width={100}
                        height={100}
                        src={croppedImage}
                      />
                    )}
                  </GridColumn>
                </Grid.Row>
              </Grid>
            </Modal.Content>
            <Modal.Actions>
              {croppedImage && (
                <Button
                  color='green'
                  inverted
                  onClick={this.uploadCroppedImage}
                >
                  <Icon name='save' />
                  Change Avatar
                </Button>
              )}
              <Button color='green' inverted onClick={this.handleCropImage}>
                <Icon name='image' />
                Preview
              </Button>
              <Button onClick={this.closeModal} color='red' inverted>
                <Icon name='remove' />
                Cancel
              </Button>
            </Modal.Actions>
          </Modal>
        </Grid.Column>
      </Grid>
    );
  }
}

export default UserPanel;
