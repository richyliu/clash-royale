Field.start(10 * 1000, 15);


Spawner.spawn(Goblin, 2, 130, 130, true);
// Spawner.spawn(BabyDragon, 1, 100, 300, true);
// Spawner.spawn(Skeleton, 4, 200, 200, true);

// Spawner.spawn(Archer, 2, 100, 200, false);
Spawner.spawn(Skeleton, 6, 130, 130, false);
// Spawner.spawn(Giant, 1, 100, 300, false);

new ArenaTower(65, 135, true);



window.addEventListener('keydown', e => {
    if (e.key == 'f') Field.stop();
});