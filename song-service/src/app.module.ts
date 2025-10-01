import { Module } from '@nestjs/common'
import { SongModule } from './modules/song/song.module'

@Module({
    imports: [SongModule]
})
export class AppModule {}
