import nodemailer from 'nodemailer';
import { IContactCreationBody } from '../types';
import { MailSenderError } from '../errors';

class MailSender {
  send = (email: string, message: string, subject: string, contact: IContactCreationBody) => {
    try {
      let mail_transporter = nodemailer.createTransport({
        jsonTransport: true
      });
  
      const email_text = message
                                .replace('<contact_name>', contact.name)
                                .replace('<contact_age>', this.calculateAge(contact.birthdate).toString())
                                .replace('<contact_phone>', contact.phone)
                                .replace('<conact_company>', contact.company)
                                .replace('<contact_birthdate>', contact.birthdate.toString())
                                .replace('<address_street>', contact.address.street)
                                .replace('<address_number>', contact.address.number.toString())
                                .replace('<address_city>', contact.address.city)
                                .replace('<address_country>', contact.address.country);

      const mail_options = {
        from: 'from@example.com',
        to: email,
        subject: subject,
        text: email_text
      };
      
      mail_transporter.sendMail(mail_options, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          return new MailSenderError({});
        } else {
          console.log('Email sent:', info);
        }
      });
    } catch (error) {
      return new MailSenderError({});
    }
  }

  calculateAge(birthdate: Date) {
    const today = new Date();
    const birth = new Date(birthdate);
    
    let age = today.getFullYear() - birth.getFullYear();
    
    const actual_month = today.getMonth();
    const birth_month = birth.getMonth();
    const actual_day = today.getDate();
    const birth_day = birth.getDate();
    
    if (actual_month < birth_month || (actual_month === birth_month && actual_day < birth_day)) {
      age--;
    }
    
    return age;
  }
  
}

export default new MailSender();