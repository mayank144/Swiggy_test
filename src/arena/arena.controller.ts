import { Body, Controller, NotFoundException, Post } from '@nestjs/common';
import { ArenaService } from './arena.service';
import { PlayersService } from 'src/players/players.service';
import { logD } from '../utils/logger';

const TAG: string = 'ArenaController';
@Controller('arena')
export class ArenaController {
  constructor(
    private readonly arenaService: ArenaService,
    private readonly playerService: PlayersService,
  ) {}

  @Post()
  fight(@Body() body: { playerAName: string; playerBName: string }) {
    logD(
      TAG,
      '-------------------------Fight Query-------------------------',
    );
    const playerA = this.playerService
      .findAll()
      .find((playerDetail) => playerDetail.name == body.playerAName);
    const playerB = this.playerService
      .findAll()
      .find((playerDetail) => playerDetail.name == body.playerBName);

    if (!playerA || !playerB) {
      throw new NotFoundException('Players not found');
    }

    return this.arenaService.fight(playerA, playerB);
  }
}
