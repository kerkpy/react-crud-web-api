import axios from "../http-common";

class ContactDataService {
  getAll() {
    return axios.get("/contacts");
  }

  get(name) {
    return axios.get(`/contacts/${name}`);
  }

  create(data) {
    return axios.post("/contacts", data);
  }

  update(name, data) {
    return axios.put(`/contacts/${name}`, data);
  }

  delete(name) {
    return axios.delete(`/contacts/${name}`);
  }

  deleteAll() {
    return axios.delete(`/contacts`);
  }

  findByName(name) {
    return axios.get(`/contacts/${name}`);
  }
}

export default new ContactDataService();