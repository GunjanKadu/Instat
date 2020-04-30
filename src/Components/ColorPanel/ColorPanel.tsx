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
} from 'semantic-ui-react';
import * as I from '../../Interfaces/ColorPanel';
import { SliderPicker } from 'react-color';

class ColorPanel extends Component<{}, I.IColorPanelState> {
  state: I.IColorPanelState = {
    modal: false,
  };

  openModal = () => this.setState({ modal: true });
  closeModal = () => this.setState({ modal: false });

  render() {
    const { modal } = this.state;
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
            <Label content='Primary  Color' />
            <SliderPicker />
            <Label content='Secondary  Color' />
            <SliderPicker />
          </Modal.Content>
          <Modal.Actions>
            <Button color='green' inverted>
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
