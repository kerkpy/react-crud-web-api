import React, { Component } from "react";
import ContactDataService from "../services/contact.service";
import { Link } from "react-router-dom";

export default class TutorialsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName= this.onChangeSearchName.bind(this);
    this.retrieveContacts = this.retrieveContacts.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveContact = this.setActiveContact.bind(this);
    this.searchName = this.searchName.bind(this);

    this.state = {
      contacts: [],
      currentContact: null,
      currentIndex: -1,
      searchName: ""
    };
  }

  componentDidMount() {
    this.retrieveContacts();
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName
    });
  }

  retrieveContacts() {
    ContactDataService.getAll()
      .then(response => {
        this.setState({
          contacts: response.data.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveContacts();
    this.setState({
      currentContact: null,
      currentIndex: -1
    });
  }

  setActiveContact(contact, index) {
    this.setState({
      currentContact: contact,
      currentIndex: index
    });
  }

  

  searchName() {
    this.setState({
      currentContact: null,
      currentIndex: -1
    });

    ContactDataService.findByName(this.state.searchName)
      .then(response => {
        this.setState({
          contacts: response.data.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const {  contacts, currentContact, currentIndex, searchName } = this.state;
    console.log(contacts)

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
              value={searchName}
              onChange={this.onChangeSearchName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchName}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Contacts List</h4>

          <ul className="list-group">
            
          {contacts &&
              contacts.map((contact, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveContact(contact, index)}
                  key={index}
                >
                  {contact.name}
                </li>
              ))}
          </ul>


        </div>
        <div className="col-md-6">
          {currentContact ? (
            <div>
              <h4>Contact</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentContact.name}
              </div>
              <div>
                <label>
                  <strong>Gender:</strong>
                </label>{" "}
                {currentContact.gender}
              </div>
              <div>
                <label>
                  <strong>Phone:</strong>
                </label>{" "}
                {currentContact.phone}
              </div>
              <div>
                <label>
                  <strong>Email:</strong>
                </label>{" "}
                {currentContact.email}
              </div>

              <Link
                to={"/contacts/" + currentContact.name}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Contact...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
