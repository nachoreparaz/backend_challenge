
export const createMockContact = () => {
  const mockContact = [{
    id: 1,
    active: true,
    name: "Ignacio Reparaz",
    email: "ignacio@gmail.com",
    birthdate: new Date("09-11-2001"),
    phone: "123456789",
    profile_image: null,
    company: "TestCompany",
    address: {
      street: "Rivadavia",
      number: 123,
      city: "Buenos Aires",
      country: "Argentina",
    },
  }, {
    id: 2,
    active: true,
    name: "Pepe",
    email: "Pepe@gmail.com",
    birthdate: new Date("10-11-2001"),
    phone: "123456789",
    profile_image: null,
    company: "TestCompany",
    address: {
      street: "9 de Julio",
      number: 5000,
      city: "Buenos Aires",
      country: "Argentina",
    },
  }];

  return mockContact;
};
