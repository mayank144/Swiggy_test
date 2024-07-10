import { Body, Module, Post } from '@nestjs/common';
import { ArenaService } from './arena.service';
import { Player } from 'src/players/players.entity';
import { PlayersService } from 'src/players/players.service';
import { ArenaController } from './arena.controller';

@Module({
  providers: [ArenaService, PlayersService],
  controllers: [ArenaController],
})
export class ArenaModule {}
