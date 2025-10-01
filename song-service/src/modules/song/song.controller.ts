import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { SongService } from './song.service'
import { CreateSongDto } from './dto/create-song.dto'
import { UpdateSongDto } from './dto/update-song.dto'

@Controller()
export class SongController {
    constructor(private readonly songService: SongService) {}

    @MessagePattern({ cmd: 'song', action: 'create' })
    create(@Payload() createSongDto: CreateSongDto) {
        return this.songService.create(createSongDto)
    }

    @MessagePattern({ cmd: 'song', action: 'findAll' })
    findAll() {
        return this.songService.findAll()
    }

    @MessagePattern({ cmd: 'song', action: 'findOne' })
    findOne(@Payload() id: number) {
        return this.songService.findOne(id)
    }

    @MessagePattern({ cmd: 'song', action: 'update' })
    update(@Payload() updateSongDto: UpdateSongDto) {
        return this.songService.update(updateSongDto.id, updateSongDto)
    }

    @MessagePattern({ cmd: 'song', action: 'remove' })
    remove(@Payload() id: number) {
        return this.songService.remove(id)
    }
}
