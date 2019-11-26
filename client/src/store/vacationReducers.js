const initialState = {
  vacations: [],
  user: []
};

export default ({ ...initialState }, action) => {
  if (action.type === "ALL_VACATION") {
    console.log(action);

    initialState.vacations = action.payload.vacations;

    return initialState;
  } else if (action.type === "USER") {
    console.log(action.payload);

    initialState.user = action.payload;

    return initialState;
  }
  switch (action.type) {
    case "ALL_VACATIONS":
      console.log(action);
      initialState = action.payload;
      return initialState;
    case "USER":
      initialState = action.payload;
      return initialState;
    default:
      return initialState;
  }
};
