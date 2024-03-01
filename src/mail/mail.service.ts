import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { config  } from 'dotenv';
config()
@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });
  }

  async sendMail(to: string, subject: string, text: string) {
    try {
      await this.transporter.sendMail({
        from: `Trịnh Công Triệu ${process.env.EMAIL}`,
        to,
        subject,
        text,
      });
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}