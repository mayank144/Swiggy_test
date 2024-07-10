import { Test, TestingModule } from '@nestjs/testing';
import { PlayersService } from '../../src/players/players.service';
import { Player } from 'src/players/players.entity';

describe('PlayersService', () => {
  let playersService: PlayersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayersService],
    }).compile();

    playersService = module.get<PlayersService>(PlayersService);
  });

  it('should be defined', () => {
    expect(playersService).toBeDefined();
  });

  it('testCreatePlayerWithPlayerA', () => {
    const player: Player = playersService.createPlayer('PlayerA', 50, 5, 10);
    expect(player.name).toEqual('PlayerA');
    expect(player.health).toEqual(50);
    expect(player.strength).toEqual(5);
    expect(player.attack).toEqual(10);
  });

  it('testCreatePlayerWithPlayerAIfAlreadyExist', () => {
    const playerA: Player = playersService.createPlayer('PlayerA', 50, 5, 10);
    expect(playerA.name).toEqual('PlayerA');
    expect(playerA.health).toEqual(50);
    expect(playerA.strength).toEqual(5);
    expect(playerA.attack).toEqual(10);
    const playerANew: Player = playersService.createPlayer('PlayerA', 60, 5, 10);
    expect(playerANew.name).toEqual('PlayerA');
    expect(playerANew.health).toEqual(60);
    expect(playerANew.strength).toEqual(5);
    expect(playerANew.attack).toEqual(10);
  });

  it('testCreatePlayerWithPlayerAAndPlayerB', () => {
    const playerA: Player = playersService.createPlayer('PlayerA', 50, 5, 10);
    expect(playerA.name).toEqual('PlayerA');
    expect(playerA.health).toEqual(50);
    expect(playerA.strength).toEqual(5);
    expect(playerA.attack).toEqual(10);
    const playerB: Player = playersService.createPlayer('PlayerB', 100, 10, 5);
    expect(playerB.name).toEqual('PlayerB');
    expect(playerB.health).toEqual(100);
    expect(playerB.strength).toEqual(10);
    expect(playerB.attack).toEqual(5);

    const players: Player[] = playersService.findAll();
    expect(players.length).toEqual(2);
  });
});
