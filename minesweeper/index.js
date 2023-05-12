const container = document.createElement('div');
container.classList.add('container');

const grid = document.createElement('div');
grid.classList.add('grid');

const flagsLeft = document.createElement('div');
flagsLeft.textContent = 'Flags left: ';

const flagsLeftSpan = document.createElement('span');
flagsLeftSpan.id = 'flags-left';
flagsLeft.append(flagsLeftSpan);

const result = document.createElement('div');
result.id = 'result';

container.append(grid, flagsLeft, result);
document.body.append(container);
