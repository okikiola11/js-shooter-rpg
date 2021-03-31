import Entity from '../js/Entity';
import EnemyGunShip from '../js/EnemyGunShip';

test('Enemys GunShip should be a subclass of Entity', () => {
  expect(EnemyGunShip).toBeSubclassOf(Entity);
});