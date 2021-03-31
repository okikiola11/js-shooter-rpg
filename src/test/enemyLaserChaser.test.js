import Entity from '../js/Entity';
import EnemyLaserChaser from '../js/EnemyLaserChaser';

test('Enemy Laser Chaser should be a subclass of Entity', () => {
  expect(EnemyLaserChaser).toBeSubclassOf(Entity);
});