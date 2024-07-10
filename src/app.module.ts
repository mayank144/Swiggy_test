import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { ArenaController } from './arena/arena.controller';
import { ArenaService } from './arena/arena.service';
import { ArenaModule } from './arena/arena.module';
import { PlayersService } from './players/players.service';
import { PlayersController } from './players/players.controller';

@Module({
  imports: [PlayersModule, ArenaModule],
  controllers: [ArenaController,PlayersController],
  providers: [ArenaService, PlayersService],
})
export class AppModule {}
