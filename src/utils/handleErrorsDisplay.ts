
//this function groups the errors and returns them in a more readable format
export function formatValidationErrors(errors) {
  const formattedResponse = {
    success: false,
    message: "Validation failed",
    fails: {}
  };

  errors.forEach(error => {
    if (!formattedResponse.fails[error.path]) {
      formattedResponse.fails[error.path] = [];
    }
    formattedResponse.fails[error.path].push(error.msg);
  });

  return formattedResponse;
}
