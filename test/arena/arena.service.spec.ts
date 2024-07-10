import { Test, TestingModule } from '@nestjs/testing';
import { ArenaService } from '../../src/arena/arena.service';
import { Player } from '../../src/players/players.entity';

describe('ArenaService', () => {
  let arenaService: ArenaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArenaService],
    }).compile();

    arenaService = module.get<ArenaService>(ArenaService);
  });

  it('testShouldBeDefinedPos', () => {
    expect(arenaService).toBeDefined();
  });

  it('should return the correct winner', () => {
    const playerA = new Player('PlayerA', 50, 5, 10);
    const playerB = new Player('PlayerB', 100, 10, 5);

    const winner = arenaService.fight(playerA, playerB);

    expect(winner).toBeInstanceOf(Player);
  });

  it('should handle player A winning', () => {
    const playerA = new Player('PlayerA', 50, 5, 100); // High attack to ensure quick win
    const playerB = new Player('PlayerB', 100, 10, 1); // Low attack to ensure quick loss

    const winner = arenaService.fight(playerA, playerB);

    expect(winner.name).toBe('PlayerA');
  });

  it('should handle player B winning', () => {
    const playerA = new Player('PlayerA', 50, 5, 1); // Low attack to ensure quick loss
    const playerB = new Player('PlayerB', 100, 10, 100); // High attack to ensure quick win

    const winner = arenaService.fight(playerA, playerB);

    expect(winner.name).toBe('PlayerB');
  });

  it('should handle player B winning if both have zero health', () => {
    const playerA = new Player('PlayerA', 0, 5, 1); // Low attack to ensure quick loss
    const playerB = new Player('PlayerB', 0, 10, 100); // High attack to ensure quick win

    const winner = arenaService.fight(playerA, playerB);

    expect(winner.name).toBe('PlayerB');
  });
});
