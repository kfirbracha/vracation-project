import axios from "axios";
export const allVacations = (func, props) => async dispatch => {
  const response = await axios.get("http://localhost:3000/");
  console.log(props);

  dispatch({
    type: "ALL_VACATION",
    payload: { vacations: response.data }
  });
};

export const User = (func, props, e) => async dispatch => {
  console.log(e);

  // const response = await axios
  //   .get("http://localhost:3000/users/login", e)
  //   .then(console.log(response));

  dispatch({
    type: "USER",
    payload: { e }
  });
};
