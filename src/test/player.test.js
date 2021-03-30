import Entity from '../js/Entity';
import Player from '../js/Player';

test('Player should be a subclass of Entity', () => {
  expect(Player).toBeSubclassOf(Entity);
});