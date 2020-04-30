/**
 *
 * @Project :  ${Instat(Instant Chat)}
 * @CreatedBy ${Gunjan Kadu}
 * @Email  ${agunjan.kadu@gmail.com}
 * @Github https://github.com/GunjanKadu/anKadu/anKadu/anKadu/anKadu/anKadu/anKadu/anKadu/anKadu/anKadu/anKadu/anKadu/anKadu/anKadu/anKadu/anKadu/
 * @date   2020-04-25 23:44:55
 *
 */

import React, { Component } from 'react';
import {
  Sidebar,
  Menu,
  Divider,
  Button,
  Modal,
  Icon,
  Label,
  Segment,
} from 'semantic-ui-react';
import * as I from '../../Interfaces/ColorPanel';
import { SliderPicker } from 'react-color';
import firebase from '../../firebase';
class ColorPanel extends Component<I.IColorPanelOwnProps, I.IColorPanelState> {
  state: I.IColorPanelState = {
    modal: false,
    primary: '',
    secondary: '',
    user: this.props.currentUser,
    usersRef: firebase.database().ref('users'),
  };

  openModal = (): void => this.setState({ modal: true });

  closeModal = (): void => this.setState({ modal: false });

  handleChangePrimary = (color: I.IColor) => {
    this.setState({ primary: color.hex });
  };
  handleChangeSecondary = (color: I.IColor) => {
    this.setState({ secondary: color.hex });
  };
  handleSaveColor = () => {
    if (this.state.primary && this.state.secondary) {
      this.saveColor(this.state.primary, this.state.secondary);
    }
  };
  saveColor = (primary: string, secondary: string) => {
    this.state.usersRef
      .child(`${this.state.user.uid}/colors`)
      .push()
      .update({ primary: primary, secondary: secondary })
      .then(() => {
        console.log('Colors Addes');
        this.closeModal();
      })
      .catch((err) => console.log(err));
  };
  render() {
    const { modal, primary, secondary } = this.state;
    return (
      <Sidebar
        as={Menu}
        icon='labeled'
        inverted
        vertical
        visible
        width='very thin'
      >
        <Divider />
        <Button icon='add' size='small' color='blue' onClick={this.openModal} />

        {/* Color Picker Modal */}
        <Modal basic open={modal} onClose={this.closeModal}>
          <Modal.Header>Choose App Color</Modal.Header>
          <Modal.Content>
            <Segment inverted>
              <Label content='Primary  Color' />
              <SliderPicker
                color={primary}
                onChange={this.handleChangePrimary}
              />
            </Segment>
            <Segment inverted>
              <Label content='Secondary  Color' />
              <SliderPicker
                color={secondary}
                onChange={this.handleChangeSecondary}
              />
            </Segment>
          </Modal.Content>
          <Modal.Actions>
            <Button color='green' inverted onClick={this.handleSaveColor}>
              <Icon name='checkmark' />
              Save Colors
            </Button>
            <Button color='red' inverted onClick={this.closeModal}>
              <Icon name='remove' />
              Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </Sidebar>
    );
  }
}

export default ColorPanel;
