import React, { Component } from "react";

import "./App.css";

import { getItems } from "./utils/api";

import List from "./components/List";
import Modal from "./components/Modal";

class App extends Component {
  state = {
    list: [],
    isLoading: true,
    show: false
  };

  hydrateStateWithLocalStorage() {
    const key = "list";
    if (localStorage.hasOwnProperty(key)) {
      let value = localStorage.getItem(key);
      try {
        value = JSON.parse(value);
        this.setState({ [key]: value, isLoading: false });
      } catch (e) {
        this.setState({ [key]: value, isLoading: false });
      }
    } else {
      getItems().then(result => {
        localStorage.setItem("list", JSON.stringify(result));
        this.setState({ isLoading: false, list: result });
      });
    }
  }

  componentDidMount() {
    this.hydrateStateWithLocalStorage();
  }

  deleteThis = item => {
    const tempList = this.state.list.filter(elem => elem !== item);
    localStorage.setItem("list", JSON.stringify(tempList));
    this.setState({ list: tempList });
  };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  addItem = item => {
    const tempList = [...this.state.list, item];
    localStorage.setItem("list", JSON.stringify(tempList));
    this.setState({ list: tempList });
  };

  render() {
    const { list } = this.state;
    return this.state.isLoading ? (
      <header className="App-body">Loading...</header>
    ) : (
      <div className="App">
        <header className="App-body">
          <h1>Market List</h1>
          {list.length ? (
            <p className="subtext">You have {list.length} items in your list</p>
          ) : null}

          <List list={list} deleteThis={this.deleteThis} />

          <Modal
            show={this.state.show}
            handleClose={this.hideModal}
            addItem={this.addItem}
          />

          <button className="button mainButton" onClick={this.showModal}>
            Add New Item +
          </button>
        </header>
      </div>
    );
  }
}

export default App;
