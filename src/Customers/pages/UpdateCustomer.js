/** @format */

import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card";
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
const UpdateCustomer = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedCustomer, setLoadedCustomer] = useState();
  const history = useHistory();
  const { customerId } = useParams();
  const [formState, inputHandler, setFormData] = useForm(
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

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + `/customers/${customerId}`
        );
        setLoadedCustomer(responseData.customer);
        setFormData(
          {
            firstName: {
              value: responseData.customer.firstName,
              isValid: true,
            },
            lastName: {
              value: responseData.customer.lastName,
              isValid: true,
            },
            phone: {
              value: responseData.customer.phone,
              isValid: true,
            },
            email: {
              value: responseData.customer.email,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchCustomers();
  }, [sendRequest, customerId, setFormData]);

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/customers/${customerId}`,
        "PATCH",
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
  if (isLoading) {
    return (
      <div className='center'>
        <LoadingSpinner asOverlay />
      </div>
    );
  }

  if (!loadedCustomer && !error) {
    return (
      <div className='center'>
        <Card>
          <h2>We could not find the customer!</h2>
        </Card>
      </div>
    );
  }
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <section className='main-content form'>
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
            initialValue={loadedCustomer.firstName}
            initialValid={true}
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
            initialValue={loadedCustomer.lastName}
            initialValid={true}
          />
          <Input
            id='phone'
            element='input'
            type='text'
            label='Phone'
            validators={[VALIDATOR_MINLENGTH(9), VALIDATOR_MAXLENGTH(13)]}
            errorText='Between 9 and 13 digits'
            onInput={inputHandler}
            initialValue={loadedCustomer.phone}
            initialValid={true}
          />
          <Input
            id='email'
            element='input'
            label='Email'
            validators={[VALIDATOR_EMAIL()]}
            errorText='Must have the email format.'
            onInput={inputHandler}
            initialValue={loadedCustomer.email}
            initialValid={true}
          />

          <Button type='submit' disabled={!formState.isValid}>
            UPDATE CUSTOMER
          </Button>
        </form>
        <div className='backParent'>
          <Link className='btnBack' to='/'>
            Back
          </Link>
        </div>
      </section>
    </>
  );
};

export default UpdateCustomer;
