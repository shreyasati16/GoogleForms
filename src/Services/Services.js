import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
};

const configg = {
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "237",
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
};

/* This is to get tokens as response from the Sign-in API after the correct credentials are sent */
export const signIn_postData = async (data) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API}/account/signin/`,
    data
  );
  if (response.status === 200) {
    return response;
  }
};

export const surveyForm_postFormData = async (data) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API}/survey/form/`,
    data,
    config
  );
  if (response.status === 201) {
    return response;
  }
};

export const formListing_getData = async (data) => {
  const response = await axios.get(
    `${process.env.REACT_APP_API}/survey/form/`,
    configg
  );
  if (response.status === 200) {
    return response;
  }
};

export const surveyFormBlock_postBlockData = async (data) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API}/survey/block/`,
    data,
    config
  );
  // if (response.status === 201) {
  return response;
  // }
};
