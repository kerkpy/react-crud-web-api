import React, { Component } from "react";
import ContactDataService from "../services/contact.service";

export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.getContact = this.getContact.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.updateContact = this.updateContact.bind(this);
    this.deleteContact = this.deleteContact.bind(this);

    this.state = {
      currentContact: {
        gender: "",
        phone: "",
        email: ""
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getContact(this.props.match.params.name);
  }

  onChangeGender(e) {
    const gender = e.target.value;
    
    this.setState(prevState => ({
      currentContact: {
        ...prevState.currentContact,
        gender: gender
      }
    }));
  }

  onChangePhone(e) {
    const phone = e.target.value;
    
    this.setState(prevState => ({
      currentContact: {
        ...prevState.currentContact,
        phone: phone
      }
    }));
  }

  onChangeEmail(e) {
    const email = e.target.value;
    
    this.setState(prevState => ({
      currentContact: {
        ...prevState.currentContact,
        email: email
      }
    }));
  }

  getContact(name) {
    ContactDataService.get(name)
      .then(response => {
        this.setState({
          currentContact: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateContact() {
    ContactDataService.update(
      this.props.match.params.name,
      this.state.currentContact
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The contact was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteContact() {    
    ContactDataService.delete(this.props.match.params.name)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/contacts')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentContact } = this.state;

    return (
      <div>
        {currentContact ? (
          <div className="edit-form">
            <h4>Contact</h4>
            <h5> {this.props.match.params.name}</h5>
            <form>
              
              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <input
                  type="text"
                  className="form-control"
                  id="gender"
                  value={currentContact.gender}
                  onChange={this.onChangeGender}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  value={currentContact.phone}
                  onChange={this.onChangePhone}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  value={currentContact.email}
                  onChange={this.onChangeEmail}
                />
              </div>

              
            </form>


            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteContact}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateContact}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Contact...</p>
          </div>
        )}
      </div>
    );
  }
}
