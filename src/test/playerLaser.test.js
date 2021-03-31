import Entity from '../js/Entity';
import PlayerLaser from '../js/PlayerLaser';

test('Players Laser should be a subclass of Entity', () => {
  expect(PlayerLaser).toBeSubclassOf(Entity);
});