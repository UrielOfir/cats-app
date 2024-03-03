import { faker } from '@faker-js/faker';

export default function makeUuid() {
  return faker.string.uuid();
}
