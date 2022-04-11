import React from "react";
// Import the CustomModal that we created in Modal.js.
import Modal from "./components/Modal";
import axios from "axios";

// We are creating a class component for our todo list and individual todo list
// items.
class App extends React.Component {
  // Here comes our constructor.
  constructor(props) {
    super(props);
    // The state object is initialized in the constructor of the component.
    // It has three properties, which we initialize:
    // viewCompleted (Boolean)
    // activeItem (object)
    // todoList (array).
    this.state = {
      viewCompleted: false,
      activeItem: {
        username: "",
        password: "",
      },
      userList: [],
    };
  }
  // The `componentDidMount()` method is called after the component is rendered,
  // at which point we call refreshList.
  // componentDidMount() is a React built-in function of a component's lifecycle.
  // See https://reactjs.org/docs/react-component.html#componentdidmount
  // componentDidMount() is invoked immediately after a component is mounted
  // (inserted into the DOM tree).
  componentDidMount() {
    this.refreshList();
  }
  // You can also define your custom functions in components as below.
  // We are using JavaScript arrow functions. There are no parameters () and
  // the function body executes an HTTP request.
  // We call refreshList multiple times during our code to send HTTP requests.
  refreshList = () => {
    // We are using the axios library for making HTTP requests.
    // Here is a GET request to our api/todos path.
    // If it succeeds, we set the todoList to the resolved data.
    // Otherwise, we catch the error and print it to the console (rejected data).
    // We are using async calls here. Please refer to the JavaScript
    // tutorial for how they work.
    axios
      .get("http://localhost:8000/api/users/")
      // To change a value in the `state` object for rendering, use `setState()`.
      // Here we get all todoList data. Each resolve (res) object has a data field.
      .then((res) => this.setState({ userList: res.data }))
      .catch((err) => console.log(err));
  };
  // Another custom function.
  // The status parameter will receive a Boolean argument --- true or false ---
  // when the displayCompleted function is being called.
  displayCompleted = (status) => {
    if (status) {
      // When a value in the state object changes, the component will re-render,
      // meaning that the output will change according to the new value(s).
      return this.setState({ viewCompleted: true });
    }
    return this.setState({ viewCompleted: false });
  };
  // Another custom function.
  // Function for switching between the Complete and Incomplete task views.
  renderTabList = () => {
    return (
      <div className="tab-list">
        {/* Complete view active */}
        <span
          onClick={() => this.displayCompleted(true)}
          // A ternary within curly braces in JSX.
          // If the call to displayCompted returns viewCompleted as true,
          // set the left, i.e., Complete view, to active ...
          className={this.state.viewCompleted ? "active" : ""}
        >
          Complete
        </span>
        {/* Incomplete view active. */}
        <span
          //  ... otherwise, set the Incomplete view to active.
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "" : "active"}
        >
          Incomplete
        </span>
      </div>
    );
  };
  // Another custom function.
  // Function for managing the edit and delete views.
  renderItems = () => {
    // Destructuring assignment that assigns viewCompleted = this.state.viewCompleted
    const { viewCompleted } = this.state;
    // filter is a callback function that returns the elements of an array
    // meeting a particular condition; here all items that are viewCompleted.
    const newItems = this.state.userList.filter(
      (item) => item.completed === viewCompleted
    );
    // The items are then mapped to their UI elements based on their id, i.e.,
    // item.id, item.description, and item.title.
    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`user-title mr-2 ${
            this.state.viewCompleted ? "completed-user" : ""
          }`}
          title={item.password}
        >
          {item.title}
        </span>
        {/* UI for editing and deleting items and their respective events. */}
        <span>
          <button
            // If the user clicks the Edit button, call the editItem function.
            onClick={() => this.editItem(item)}
            className="btn btn-secondary mr-2"
          >
            {" "}
            Edit{" "}
          </button>
          <button
            // If the user clicks the Delete button, call the handleDelete function.
            onClick={() => this.handleDelete(item)}
            className="btn btn-danger"
          >
            Delete{" "}
          </button>
        </span>
      </li>
    ));
  };
  // Another custom function.
  // To change a value in the state object, use the this.setState() method.
  // When a value in the state object changes, the component will re-render the
  // page, meaning that the output will change according to the new value(s).
  toggle = () => {
    // We have a modal view below in the render() function.
    // Upon toggle, set the modal to false, i.e., do not show the modal.
    this.setState({ modal: !this.state.modal });
  };
  // Another custom function.
  handleSubmit = (item) => {
    this.toggle();
    // If the item already exists in our database, i.e., we have an id for our
    // item, use a PUT request to modify it.
    if (item.id) {
      axios
        // Note that we are using backticks here instead of double quotes.
        // Backticks are useful because they allow us to use dynamic variables,
        // i.e., the item.id in this case. You can use this technique also
        // for authentication tokens.
        .put(`http://localhost:8000/api/users/${item.id}/`, item)
        .then((res) => this.refreshList());
      return;
    }
    // If the item does not yet exist, use a POST request to write to the
    // database.
    axios
      .post("http://localhost:8000/api/users/", item)
      .then((res) => this.refreshList());
  };
  // Another custom function.
  // If the user triggers a delete event, send a delete request.
  handleDelete = (item) => {
    axios
      .delete(`http://localhost:8000/api/users/${item.id}`)
      .then((res) => this.refreshList());
  };
  // Another custom function.
  // If the user triggers a createItem event (by clicking on Add task), create
  // a new item with default values and set the modal to false.
  createItem = () => {
    const item = { username: "", password: "" };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  // Another custom function.
  // If the use triggers an editItem event.
  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  // The `render()` method is the only required method in a class component.
  // When called, it will render the page. You do not have to specifically
  // call render() in your component. Rather, the stub code with the
  // ReactDOM.render(...) in your index.js will do that for you.
  render() {
    return (
      <main className="content">
        <h1 className="text-white text-uppercase text-center my-4">User app</h1>
        <div className="row ">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="">
                {/* If the user clicks the Add task button, call the createItem function. */}
                <button onClick={this.createItem} className="btn btn-primary">
                  Add User
                </button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {/* If the modal state is true, show the modal component. */}
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}

class App2 extends React.Component {
  // Here comes our constructor.
  constructor(props) {
    super(props);
    // The state object is initialized in the constructor of the component.
    // It has three properties, which we initialize:
    // viewCompleted (Boolean)
    // activeItem (object)
    // todoList (array).
    this.state = {
      viewCompleted: false,
      activeItem: {
        artist: "",
        song: "",
      },
      artistList: [],
    };
  }
  // The `componentDidMount()` method is called after the component is rendered,
  // at which point we call refreshList.
  // componentDidMount() is a React built-in function of a component's lifecycle.
  // See https://reactjs.org/docs/react-component.html#componentdidmount
  // componentDidMount() is invoked immediately after a component is mounted
  // (inserted into the DOM tree).
  componentDidMount() {
    this.refreshList();
  }
  // You can also define your custom functions in components as below.
  // We are using JavaScript arrow functions. There are no parameters () and
  // the function body executes an HTTP request.
  // We call refreshList multiple times during our code to send HTTP requests.
  refreshList = () => {
    // We are using the axios library for making HTTP requests.
    // Here is a GET request to our api/todos path.
    // If it succeeds, we set the todoList to the resolved data.
    // Otherwise, we catch the error and print it to the console (rejected data).
    // We are using async calls here. Please refer to the JavaScript
    // tutorial for how they work.
    axios
      .get("http://localhost:8000/api/artists/")
      // To change a value in the `state` object for rendering, use `setState()`.
      // Here we get all todoList data. Each resolve (res) object has a data field.
      .then((res) => this.setState({ artistList: res.data }))
      .catch((err) => console.log(err));
  };
  // Another custom function.
  // The status parameter will receive a Boolean argument --- true or false ---
  // when the displayCompleted function is being called.
  displayCompleted = (status) => {
    if (status) {
      // When a value in the state object changes, the component will re-render,
      // meaning that the output will change according to the new value(s).
      return this.setState({ viewCompleted: true });
    }
    return this.setState({ viewCompleted: false });
  };
  // Another custom function.
  // Function for switching between the Complete and Incomplete task views.
  renderTabList = () => {
    return (
      <div className="tab-list">
        {/* Complete view active */}
        <span
          onClick={() => this.displayCompleted(true)}
          // A ternary within curly braces in JSX.
          // If the call to displayCompted returns viewCompleted as true,
          // set the left, i.e., Complete view, to active ...
          className={this.state.viewCompleted ? "active" : ""}
        >
          Complete
        </span>
        {/* Incomplete view active. */}
        <span
          //  ... otherwise, set the Incomplete view to active.
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "" : "active"}
        >
          Incomplete
        </span>
      </div>
    );
  };
  // Another custom function.
  // Function for managing the edit and delete views.
  renderItems = () => {
    // Destructuring assignment that assigns viewCompleted = this.state.viewCompleted
    const { viewCompleted } = this.state;
    // filter is a callback function that returns the elements of an array
    // meeting a particular condition; here all items that are viewCompleted.
    const newItems = this.state.artistList.filter(
      (item) => item.completed === viewCompleted
    );
    // The items are then mapped to their UI elements based on their id, i.e.,
    // item.id, item.description, and item.title.
    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`user-title mr-2 ${
            this.state.viewCompleted ? "completed-user" : ""
          }`}
          title={item.password}
        >
          {item.title}
        </span>
        {/* UI for editing and deleting items and their respective events. */}
        <span>
          <button
            // If the user clicks the Edit button, call the editItem function.
            onClick={() => this.editItem(item)}
            className="btn btn-secondary mr-2"
          >
            {" "}
            Edit{" "}
          </button>
          <button
            // If the user clicks the Delete button, call the handleDelete function.
            onClick={() => this.handleDelete(item)}
            className="btn btn-danger"
          >
            Delete{" "}
          </button>
        </span>
      </li>
    ));
  };
  // Another custom function.
  // To change a value in the state object, use the this.setState() method.
  // When a value in the state object changes, the component will re-render the
  // page, meaning that the output will change according to the new value(s).
  toggle = () => {
    // We have a modal view below in the render() function.
    // Upon toggle, set the modal to false, i.e., do not show the modal.
    this.setState({ modal: !this.state.modal });
  };
  // Another custom function.
  handleSubmit = (item) => {
    this.toggle();
    // If the item already exists in our database, i.e., we have an id for our
    // item, use a PUT request to modify it.
    if (item.id) {
      axios
        // Note that we are using backticks here instead of double quotes.
        // Backticks are useful because they allow us to use dynamic variables,
        // i.e., the item.id in this case. You can use this technique also
        // for authentication tokens.
        .put(`http://localhost:8000/api/artists/${item.id}/`, item)
        .then((res) => this.refreshList());
      return;
    }
    // If the item does not yet exist, use a POST request to write to the
    // database.
    axios
      .post("http://localhost:8000/api/artists/", item)
      .then((res) => this.refreshList());
  };
  // Another custom function.
  // If the user triggers a delete event, send a delete request.
  handleDelete = (item) => {
    axios
      .delete(`http://localhost:8000/api/artists/${item.id}`)
      .then((res) => this.refreshList());
  };
  // Another custom function.
  // If the user triggers a createItem event (by clicking on Add task), create
  // a new item with default values and set the modal to false.
  createItem = () => {
    const item = { artist: "", song: "" };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  // Another custom function.
  // If the use triggers an editItem event.
  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  // The `render()` method is the only required method in a class component.
  // When called, it will render the page. You do not have to specifically
  // call render() in your component. Rather, the stub code with the
  // ReactDOM.render(...) in your index.js will do that for you.
  render() {
    return (
      <main className="content">
        <h1 className="text-white text-uppercase text-center my-4">User app</h1>
        <div className="row ">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="">
                {/* If the user clicks the Add task button, call the createItem function. */}
                <button onClick={this.createItem} className="btn btn-primary">
                  Add Song
                </button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {/* If the modal state is true, show the modal component. */}
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}

// Export our App so that it can be rendered in index.js, where it is imported.
export default App;
