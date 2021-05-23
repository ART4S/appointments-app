import faker from "faker";

import { repeat, normalize } from "utils/collectionUtils";

function createClient() {
  return {
    id: faker.datatype.uuid(),
    firstName: faker.name.firstName(),
    middleName: faker.name.middleName(),
    lastName: faker.name.lastName(),
    address: faker.address.streetAddress(true),
    phoneNumber: faker.phone.phoneNumber(),
    email: faker.internet.email(),
  };
}

const clients = normalize(repeat(1000, createClient));

export default clients;
