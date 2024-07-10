import { Injectable } from '@nestjs/common';
import { Player } from 'src/players/players.entity';
import { logD } from '../utils/logger';

const TAG: string = 'ArenaService';

@Injectable()
export class ArenaService {
  fight(playerA: Player, playerB: Player): Player {
    let attacker: Player, defender: Player;
    if (playerA.health < playerB.health) {
      attacker = playerA;
      defender = playerB;
    } else {
      attacker = playerB;
      defender = playerA;
    }
    if (!defender.isAlive()) {
      logD(TAG, `${attacker.name} win the game`);
      return attacker;
    }

    logD(TAG, `attacker:${attacker.name}`);
    logD(TAG, `defender:${defender.name}`);

    while (true) {
      const attackDiceRoll = this.rollDice();
      const defenderDiceRoll = this.rollDice();
      logD(TAG, `attackDiceRoll:${attackDiceRoll}`);
      logD(TAG, `defenderDiceRoll:${defenderDiceRoll}`);

      const attackDamage = attackDiceRoll * attacker.attack;
      const defenceStrength = defenderDiceRoll * defender.strength;
      logD(TAG, `attackDamage:${attackDamage}`);
      logD(TAG, `defenceStrength:${defenceStrength}`);

      const finalDamage = attackDamage - defenceStrength;
      logD(TAG, `finalDamage:${finalDamage}`);

      if (finalDamage > 0) {
        defender.health -= finalDamage;
      }

      if (!defender.isAlive()) {
        logD(TAG, `${attacker.name} win the game`);
        return attacker;
      }

      logD(TAG, 'defender still alive');
      const temp = attacker;
      attacker = defender;
      defender = temp;

      logD(TAG, `New Attacker:${JSON.stringify(attacker)}`);
      logD(TAG, `New Defender:${JSON.stringify(defender)}`);
    }
  }

  private rollDice(): number {
    return Math.floor(Math.random() * 6) + 1;
  }
}
