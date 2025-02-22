import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../utils/baseUrl";
import "./ContactsAdd.css";

const initialData = {
  firstName: "",
  lastName: "",
  street: "",
  city: "",
  email: "",
  linkedIn: "",
  twitter: "",
  contactType: "",
};

const NewContact = ({ contacts, setContacts }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialData);

  const formInputChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  async function updateLocalServer(el, id) {
    const opts = {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(el),
    };

    const response = await fetch(`${baseUrl}/contacts`, opts);
    const newUser = await response.json();
    setContacts([...contacts, newUser]);
  }

  const onSubmitFormHandler = (e) => {
    e.preventDefault();
    setContacts([...contacts, formData]);
    updateLocalServer(formData);
    setFormData(initialData);
    navigate("/");
  };

  return (
    <section className="form-component">
      <form onSubmit={onSubmitFormHandler}>
        <h1>Add New Contact</h1>
        <div className="icon">
          <i className="fas fa-user-circle"></i>
        </div>
        <select
          onChange={formInputChangeHandler}
          name="contactType"
          value={formData.contactType}
        >
          <option value="work">Work</option>
          <option value="personal">Personal</option>
        </select>
        <div className="form-container">
          <div className="container">
            <label htmlFor="firstName">
              <strong>First Name</strong>
            </label>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              id="firstName"
              required
              onChange={formInputChangeHandler}
              value={formData.name}
            ></input>

            <label htmlFor="lastName">
              <strong>Last Name</strong>
            </label>
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              id="lastName"
              required
              onChange={formInputChangeHandler}
              value={formData.surname}
            ></input>

            <label htmlFor="street">
              <strong>Street Address</strong>
            </label>
            <input
              type="text"
              placeholder="Street"
              name="street"
              id="street"
              required
              onChange={formInputChangeHandler}
              value={formData.address}
            ></input>
            <label htmlFor="city">
              <strong>City</strong>
            </label>
            <input
              type="text"
              placeholder="City"
              name="city"
              id="city"
              required
              onChange={formInputChangeHandler}
              value={formData.city}
            ></input>
            <label htmlFor="email">email:</label>
            <input
              id="email"
              name="email"
              type="text"
              required
              onChange={formInputChangeHandler}
              value={formData.email}
            />

            <label htmlFor="linkedIn">linkedIn:</label>
            <input
              id="linkedIn"
              name="linkedIn"
              type="text"
              required
              onChange={formInputChangeHandler}
              value={formData.linkedIn}
            />

            <label htmlFor="twitter">twitter:</label>
            <input
              id="twitter"
              name="twitter"
              type="text"
              required
              onChange={formInputChangeHandler}
              value={formData.twitter}
            />
          </div>
          <button type="submit">
            <strong>Add Contact</strong>
          </button>
        </div>
      </form>
    </section>
  );
};

export default NewContact;
