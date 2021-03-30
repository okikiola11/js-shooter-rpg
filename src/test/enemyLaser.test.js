import Entity from '../js/Entity';
import EnemyLaser from '../js/EnemyLaser';

test('Enemy Laser should be a subclass of Entity', () => {
  expect(EnemyLaser).toBeSubclassOf(Entity);
});