import { sequelize } from "../database/postgres";
import { NotFound } from "../errors";
import { Address, Contact } from "../model/contact";
import ContactRepository from "../repository/contact";
import { createMockContact } from "./utils/mockContact";

jest.mock('../model/contact', () => ({
  Contact: {
    create: jest.fn(),
    findOne: jest.fn(),
    customRetrieveAll: jest.fn()
  },
  Address: {
    create: jest.fn()
  }
}));

describe("ContactRepository", () => {

  let contactRepository: ContactRepository;
  const mockContacts = createMockContact();

  beforeAll(async () => {
    contactRepository = new ContactRepository(Contact);
  
    (Contact.create as jest.Mock).mockImplementation(async (contact) => {
      return contact
    });
    
  
    (Contact.findOne as jest.Mock).mockImplementation(async (query) => {
      return mockContacts.find(contact => contact.id === query.where.id && contact.active);
    });

    await Promise.all(mockContacts.map(async (mockContact) => {
      await contactRepository.createContact(mockContact);
    }));
  });

  afterAll(async () => {
    jest.clearAllMocks();
    await sequelize.close();
  });

  test("retrieveById - should return a contact", async () => {
      const result = await contactRepository.retrieveById(1);
      expect(result.name).toBe("Ignacio Reparaz");
  })

  test("retrieveById - should throw a Not Found Error if contact does not exists", async () => {
    await expect(contactRepository.retrieveById(1000)).rejects.toThrow(NotFound)
})

});
