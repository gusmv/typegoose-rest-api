import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';
import nodemailer, { Transporter } from 'nodemailer';

import config from '@config/mail';

interface IRequest {
  subject: string;
  template: string;
  recipient: string;
  variables: object;
}

class Mail {
  private transporter: Transporter;

  constructor() {
    const { host, port, auth } = config.config;

    this.transporter = nodemailer.createTransport({
      host,
      port,
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
    console.log(parseTemplate(variables));

    const message = await this.transporter.sendMail({
      from,
      to: recipient,
      subject,
      text: 'Hey there!',
      html: parseTemplate(variables),
    });

    console.log(message.messageId);
    console.log(nodemailer.getTestMessageUrl(message));
  }
}

export default Mail;
