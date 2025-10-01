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

@Controller('users')
export class UsersController {
    constructor(private readonly rmqClient: RmqClientProvider) {}

    private getCurrentUser() {
        return {
            id: '64b8f0f4e4b0c5a1d6f8e9c3',
            name: 'Admin User',
            email: 'admin@example.com',
            role: 'admin' // optional role field
        }
    }

    @Post('create')
    async createUser(@Body() body: any): Promise<any> {
        body.currentUser = this.getCurrentUser()
        return await firstValueFrom(
            this.rmqClient.userClient.send(
                { cmd: 'user', action: 'create' },
                body
            )
        )
    }

    @Get('all')
    async getAllUsers(): Promise<any> {
        const payload = { currentUser: this.getCurrentUser() }
        return await firstValueFrom(
            this.rmqClient.userClient.send(
                { cmd: 'user', action: 'findAll' },
                payload
            )
        )
    }

    @Get(':id')
    async getUserById(@Param('id') id: string): Promise<any> {
        const payload = { id, currentUser: this.getCurrentUser() }
        return await firstValueFrom(
            this.rmqClient.userClient.send(
                { cmd: 'user', action: 'findOne' },
                payload
            )
        )
    }

    @Patch('update')
    async updateUser(@Body() body: { id: string; data: any }): Promise<any> {
        const payload = { ...body, currentUser: this.getCurrentUser() }
        return await firstValueFrom(
            this.rmqClient.userClient.send(
                { cmd: 'user', action: 'update' },
                payload
            )
        )
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<any> {
        const payload = { id, currentUser: this.getCurrentUser() }
        return await firstValueFrom(
            this.rmqClient.userClient.send(
                { cmd: 'user', action: 'delete' },
                payload
            )
        )
    }
}
