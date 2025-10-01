import { ClientProxyFactory, Transport } from '@nestjs/microservices'
import { Injectable } from '@nestjs/common'

@Injectable()
export class RmqClientProvider {
    public userClient = ClientProxyFactory.create({
        transport: Transport.RMQ,
        options: {
            urls: ['amqp://user:password@localhost:5672'],
            queue: 'users-queue',
            queueOptions: { durable: true }
        }
    })

    public songClient = ClientProxyFactory.create({
        transport: Transport.RMQ,
        options: {
            urls: ['amqp://user:password@localhost:5672'],
            queue: 'songs-queue',
            queueOptions: { durable: true }
        }
    })

    // Later: playbackClient, recommendationClient
}
