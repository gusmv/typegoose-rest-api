import { Queue, Worker, QueueEvents } from 'bullmq';
import IORedis from 'ioredis';

import Mail from './mail';

import IMailDataDTO from './dtos/IMailDataDTO';

import config from '@config/database';

class Queues {
  public email: Queue;

  constructor() {
    this.create();
    this.events();
    this.workers();
  }

  private create(): void {
    const { redisdb } = config;

    const connection = new IORedis({
      host: redisdb.host,
      port: Number(redisdb.port),
    });
    this.email = new Queue('emails', { connection });
  }

  private events(): void {
    const events = new QueueEvents('emails');

    events.on('completed', job => {
      console.log(`Status: completed, jobId: ${job.jobId}`);
    });
  }

  private async workers(): Promise<void> {
    // eslint-disable-next-line no-new
    new Worker('emails', async job => {
      const { email: recipient, subject, ...data } = job.data as IMailDataDTO;
      console.log('running');

      const mail = new Mail();
      await mail.send({
        template: job.name,
        variables: data,
        subject,
        recipient,
      });
    });
  }
}

export default new Queues();
