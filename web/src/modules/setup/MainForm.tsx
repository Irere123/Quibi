import React, { Component } from "react";

import { UserRole, UserNeed, UserSchool } from "./Pages";

export class MainForm extends Component<{}, {}> {
  state = {
    step: 1,
    role: "",
    email: "",
    age: "",
    city: "",
    country: "",
  };

  nextStep = (step: number) => {
    this.setState({
      step,
    });
  };

  prevStep = (step: number) => {
    this.setState({
      step,
    });
  };

  handleChange = (input: any) => (event: { target: { value: any } }) => {
    this.setState({ [input]: event.target.value });
  };

  render() {
    const { step } = this.state;
    const { role, email, age, city, country } = this.state;
    const values = { role, email, age, city, country };

    switch (step) {
      case 1:
        return <UserNeed nextStep={this.nextStep} />;
      case 2:
        return (
          <UserRole
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={values}
          />
        );
      case 3:
        return (
          <UserSchool
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 5:
        return (
          <div>
            <p>register school</p>
          </div>
        );
      case 6:
        return (
          <div>
            <p>student number</p>
          </div>
        );
      case 4:
        return (
          <div>
            <h1>Success</h1>
          </div>
        );
    }
  }
}
