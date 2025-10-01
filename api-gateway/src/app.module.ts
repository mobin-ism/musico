import { Module } from '@nestjs/common'
import { UsersController } from './modules/users/users.controller'
import { SongsController } from './modules/songs/songs.controller'
import { RmqClientProvider } from './rmq/client.provider'

@Module({
    imports: [],
    controllers: [UsersController, SongsController],
    providers: [RmqClientProvider]
})
export class AppModule {}
