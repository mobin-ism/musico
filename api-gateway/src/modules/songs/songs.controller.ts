import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post
} from '@nestjs/common'
import { firstValueFrom } from 'rxjs'
import { RmqClientProvider } from 'src/rmq/client.provider'

@Controller('songs')
export class SongsController {
    constructor(private readonly rmqClient: RmqClientProvider) {}

    private getCurrentUser() {
        return {
            id: '64b8f0f4e4b0c5a1d6f8e9c3',
            name: 'Admin User',
            email: 'admin@example.com',
            role: 'admin' // optional
        }
    }

    @Post('create')
    async createSong(@Body() body: any): Promise<any> {
        body.currentUser = this.getCurrentUser()
        return await firstValueFrom(
            this.rmqClient.songClient.send(
                { cmd: 'song', action: 'create' },
                body
            )
        )
    }

    @Get('all')
    async getAllSongs(): Promise<any> {
        const payload = { currentUser: this.getCurrentUser() }
        return await firstValueFrom(
            this.rmqClient.songClient.send(
                { cmd: 'song', action: 'findAll' },
                payload
            )
        )
    }

    @Get(':id')
    async getSongById(@Param('id') id: string): Promise<any> {
        const payload = { id, currentUser: this.getCurrentUser() }
        return await firstValueFrom(
            this.rmqClient.songClient.send(
                { cmd: 'song', action: 'findOne' },
                payload
            )
        )
    }

    @Patch('update')
    async updateSong(@Body() body: { id: string; data: any }): Promise<any> {
        const payload = { ...body, currentUser: this.getCurrentUser() }
        return await firstValueFrom(
            this.rmqClient.songClient.send(
                { cmd: 'song', action: 'update' },
                payload
            )
        )
    }

    @Delete(':id')
    async deleteSong(@Param('id') id: string): Promise<any> {
        const payload = { id, currentUser: this.getCurrentUser() }
        return await firstValueFrom(
            this.rmqClient.songClient.send(
                { cmd: 'song', action: 'delete' },
                payload
            )
        )
    }
}
