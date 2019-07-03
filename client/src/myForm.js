import React from "react";
import * as conversationalForm from "conversational-form";

export default class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.formFields = [
      {
        tag: "input",
        type: "text",
        name: "firstName",
        "cf-questions": "What is your firstname?"
      },
      {
        tag: "input",
        type: "text",
        name: "lastName",
        "cf-questions": "What is your lastname?"
      },
      {
        tag: "input",
        type: "email",
        name: "email",
        "cf-questions": "What is your email?"
      },
      {
        tag: "input",
        type: "tel",
        name: "phone",
        "cf-questions": "What is your phone?"
      }
    ];

    this.submitCallback = this.submitCallback.bind(this);
  }

  componentDidMount() {
    this.cf = conversationalForm.startTheConversation({
      options: {
        submitCallback: this.submitCallback
      },
      tags: this.formFields
    });
    this.elem.appendChild(this.cf.el);
  }

  submitCallback() {
    var formDataSerialized = this.cf.getFormData(true);

    console.log("Formdata, obj:", formDataSerialized);
    fetch("/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formDataSerialized)
    });

    this.cf.addRobotChatResponse("Hooray! Your registration is complete!");
  }

  render() {
    return (
      <div>
        <div ref={ref => (this.elem = ref)} />
      </div>
    );
  }
}
