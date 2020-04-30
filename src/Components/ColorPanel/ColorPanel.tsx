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
    userColors: [],
  };

  componentDidMount() {
    if (this.state.user) {
      this.addListener(this.state.user.uid);
    }
  }

  addListener = (userId: string) => {
    let userColor: I.IColorSnap[] = [];
    this.state.usersRef.child(`${userId}/colors`).on('child_added', (snap) => {
      userColor.unshift(snap.val());
      this.setState({ userColors: userColor });
    });
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
  displayUserColors = (colors: I.IColorSnap[]) =>
    colors.length > 0 &&
    colors.map((colors: I.IColorSnap, i: number) => (
      <React.Fragment key={i}>
        <Divider />
        <div className='color_container'>
          <div className='color_square' style={{ background: colors.primary }}>
            <div
              className='color_overlay'
              style={{ background: colors.secondary }}
            ></div>
          </div>
        </div>
      </React.Fragment>
    ));
  render() {
    const { modal, primary, secondary, userColors } = this.state;
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
        {this.displayUserColors(userColors)}

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
