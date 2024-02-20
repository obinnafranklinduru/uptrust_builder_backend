interface ApiResponse {
  statusCode: number;
  message: string;
  data?: unknown;
}

const formatResponse = (
  statusCode: number,
  message: string,
  data?: unknown
): ApiResponse => {
  return { statusCode, message, data };
};

export const SuccessResponse = (data: object): ApiResponse => {
  return formatResponse(200, "success", data);
};

export const ErrorResponse = (
  code: number = 1000,
  error: unknown
): ApiResponse => {
  if (Array.isArray(error)) {
    const errorObject = error[0].constraints;
    const errorMessage =
      errorObject[Object.keys(errorObject)[0]] || "Error Occurred";
    return formatResponse(code, errorMessage);
  }

  return formatResponse(500, `Error: ${error}`, error);
};
