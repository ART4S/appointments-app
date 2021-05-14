/* eslint-disable import/prefer-default-export */
import ClientError from "common/errors/clientError";

export async function handleResponse(promiseGetter) {
  let response;
  try {
    response = await promiseGetter();
  } catch (e) {
    response = e.response;
  }

  const { status, data } = response;

  if (status === 200 || status === 201) {
    return { isSuccess: true, data };
  }

  if (status === 400) {
    return { isSuccess: false, data };
  }

  throw new ClientError(`unhandled status: ${status}`);
}
