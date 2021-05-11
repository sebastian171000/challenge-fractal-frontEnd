/** @format */

import React from "react";
import { useHistory, Link } from "react-router-dom";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Input from "../../shared/components/FormElements/Input";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_NO_ESPECIAL_CHARACTER,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import "../../shared/components/FormElements/PlaceForm.css";
import Button from "../../shared/components/FormElements/Button";
const NewCustomer = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      firstName: {
        value: "",
        isValid: false,
      },
      lastName: {
        value: "",
        isValid: false,
      },
      phone: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/customers/",
        "POST",
        JSON.stringify({
          firstName: formState.inputs.firstName.value,
          lastName: formState.inputs.lastName.value,
          phone: formState.inputs.phone.value,
          email: formState.inputs.email.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      history.push("/");
    } catch (error) {}
  };
  const history = useHistory();
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <section className='main-content form'>
        {isLoading && <LoadingSpinner asOverlay />}
        <form className='place-form' onSubmit={placeSubmitHandler}>
          <Input
            id='firstName'
            element='input'
            type='text'
            label='First Name'
            validators={[
              VALIDATOR_NO_ESPECIAL_CHARACTER(),
              VALIDATOR_REQUIRE(),
            ]}
            errorText='No especial characters.'
            onInput={inputHandler}
          />
          <Input
            id='lastName'
            element='input'
            type='text'
            label='Last Name'
            validators={[
              VALIDATOR_NO_ESPECIAL_CHARACTER(),
              VALIDATOR_REQUIRE(),
            ]}
            errorText='No especial characters.'
            onInput={inputHandler}
          />
          <Input
            id='phone'
            element='input'
            type='text'
            label='Phone'
            validators={[VALIDATOR_MINLENGTH(9), VALIDATOR_MAXLENGTH(13)]}
            errorText='Between 9 and 13 digits'
            onInput={inputHandler}
          />
          <Input
            id='email'
            element='input'
            label='Email'
            validators={[VALIDATOR_EMAIL()]}
            errorText='Must have the email format.'
            onInput={inputHandler}
          />

          <Button type='submit' disabled={!formState.isValid}>
            ADD CUSTOMER
          </Button>
        </form>
        <Link to='/'>Back</Link>
      </section>
    </>
  );
};

export default NewCustomer;
