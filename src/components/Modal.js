import React, { Component } from "react";

class Modal extends Component {
  state = {
    item: ""
  };

  handleInput = event => {
    this.setState({ item: event.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.item.length) {
      const item = this.state.item;
      this.setState({ item: "" });
      this.props.addItem(item);
    }
    this.props.handleClose();
  };

  render() {
    const { handleClose, show } = this.props;

    const showHideClassName = show
      ? "modal display-block"
      : "modal display-none";

    const isEnabled = this.state.item.length > 0;

    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          <h4>Add new item</h4>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              className="modal-input"
              onChange={this.handleInput}
              value={this.state.item}
              placeholder="Enter item name"
            />
            <div>
              <button className="button modalButton" onClick={handleClose}>
                Close
              </button>
              <button
                disabled={!isEnabled}
                className="button modalButton"
                type="submit"
              >
                Add
              </button>
            </div>
          </form>
        </section>
      </div>
    );
  }
}

export default Modal;
