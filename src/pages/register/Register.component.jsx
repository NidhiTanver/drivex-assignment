import React, { useState } from "react";
import { userFormData } from "./mockData";
import InputField from "../../ui/InputField/InputField";
import { useNavigate } from "react-router-dom";

const Register = ({ view }) => {
  let formData = userFormData;
  const isUserProfile = view === "profile";
  if (isUserProfile) {
    const userData = JSON.parse(localStorage.getItem("drivex-user-data"));

    formData = formData?.map((item) => {
      return { ...item, value: userData[item.name] };
    });
  }

  const [form, setForm] = useState(formData);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const inputName = e?.target?.name;
    const inputValue = e?.target?.value;
    const updatedForm = form?.map((item) => {
      if (item?.name === inputName) {
        return { ...item, value: inputValue, error: "", hasError: "" };
      } else {
        return { ...item };
      }
    });
    setForm(updatedForm);
  };

  const registerHandler = (e) => {
    e.preventDefault();
    let res = true;
    const formFields = form?.map((item) => {
      if (item?.value === "") {
        res = false;
        return {
          ...item,
          error: `${item?.field} is Required`,
          hasError: "is-invalid",
        };
      } else {
        return { ...item };
      }
    });
    setForm(formFields);

    if (res) {
      const data = form?.reduce((a, c) => ({ ...a, [c.name]: c.value }), {});
      localStorage.setItem("drivex-user-data", JSON.stringify(data));
      navigate("/items/0");
    }
  };

  return (
    <div className="row">
      <div className="col-sm-6 offset-sm-3">
        <h2>{isUserProfile ? "Update user profile!" : "Register"} </h2>
        <form onSubmit={registerHandler}>
          {form?.map((data, i) => (
            <div key={i} className="form-group">
              <InputField data={data} action={inputHandler} />
            </div>
          ))}
          <div className="form-group">
            <button className="btn btn-primary">
              {isUserProfile ? "Update" : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
