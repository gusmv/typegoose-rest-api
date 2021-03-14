import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';
import nodemailer, { Transporter } from 'nodemailer';

import config from '@config/mail';
import appConfig from '@config/app';

interface IRequest {
  subject: string;
  template: string;
  recipient: string;
  variables: object;
}

class Mail {
  private transporter: Transporter;

  constructor() {
    const { host, port, auth } = config.transport;

    this.transporter = nodemailer.createTransport({
      host,
      port: Number(port),
      auth,
    });
  }

  async send({
    subject,
    recipient,
    template,
    variables,
  }: IRequest): Promise<void> {
    const { from } = config;

    const parseTemplate = handlebars.compile(
      fs.readFileSync(path.resolve(__dirname, 'views', template), {
        encoding: 'utf-8',
      }),
    );

    const message = await this.transporter.sendMail({
      from,
      to: recipient,
      subject,
      text: 'Hey there!',
      html: parseTemplate(variables),
    });

    if (appConfig.env === 'development') {
      // Logging on development mode
      console.log(message.messageId);
      console.log(nodemailer.getTestMessageUrl(message));
    }
  }
}

export default Mail;
