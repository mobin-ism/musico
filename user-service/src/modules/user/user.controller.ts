import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @MessagePattern({ cmd: 'user', action: 'create' })
    create(@Payload() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto)
    }

    @MessagePattern({ cmd: 'user', action: 'findAll' })
    findAll() {
        return this.userService.findAll()
    }

    @MessagePattern({ cmd: 'user', action: 'findOne' })
    findOne(@Payload() id: number) {
        return this.userService.findOne(id)
    }

    @MessagePattern({ cmd: 'user', action: 'update' })
    update(@Payload() updateUserDto: UpdateUserDto) {
        return this.userService.update(updateUserDto.id, updateUserDto)
    }

    @MessagePattern({ cmd: 'user', action: 'remove' })
    remove(@Payload() id: number) {
        return this.userService.remove(id)
    }
}
