// Create element helper function
function createElement(tag, attributes = {}, textContent = '') {
    const element = document.createElement(tag);
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
    element.textContent = textContent;
    return element;
  }
  
  // Create the HTML structure
  const section = createElement('section');
  const inputFormMode = createElement('input', {
    type: 'radio',
    name: 'mode',
    id: 'form-mode',
    hidden: true,
    checked: true
  });
  const form = createElement('form', { action: 'javascript:', id: 'new-game-form' });
  const table = createElement('table');
  const thead = createElement('thead');
  const tbody = createElement('tbody');
  const tr1 = createElement('tr');
  const tr2 = createElement('tr');
  const tr3 = createElement('tr');
  const tr4 = createElement('tr');
  const td1 = createElement('td');
  const td2 = createElement('td');
  const td3 = createElement('td');
  const td4 = createElement('td');
  const label4 = createElement('label');
  const input4 = createElement('input', { id: 'custom-difficulty-radio', type: 'radio', name: 'difficulty', value: '30x20/100' });
  const input2 = createElement('input', { id: 'width-input', type: 'number', name: 'width', min: '7', value: '30' });
  const input3 = createElement('input', { id: 'height-input', type: 'number', name: 'height', min: '7', value: '20' });
  const input5 = createElement('input', { id: 'mine-count-input', type: 'number', name: 'mines', min: '4', value: '100' });
  const button = createElement('button');
  const label5 = createElement('label', { for: 'game-mode' }, 'Start New Game');
  const main = createElement('main');
  const inputGameMode = createElement('input', {
    type: 'radio',
    name: 'mode',
    id: 'game-mode',
    hidden: true,
    checked: true
  });
  const header = createElement('header');
  const outputMineCounter = createElement('output', { id: 'mine-counter' });
  const buttonRestart = createElement('button', { id: 'restart-btn' });
  const label6 = createElement('label', { for: 'form-mode' }, '🙂');
  const outputTimer = createElement('output', { id: 'timer' });
  const tableBoard = createElement('table', { id: 'board' });
  const tbodyBoard = createElement('tbody');
  
  // Set the table header content
  tr1.innerHTML = '<th></th><th>width</th><th>height</th><th>mines</th>';
  tr2.innerHTML = '<td><label><input type="radio" name="difficulty" value="9x9/10">Beginner</label></td><td>9</td><td>9</td><td>10</td>';
  tr3.innerHTML = '<td><label><input type="radio" name="difficulty" value="16x16/40" checked>Intermediate</label></td><td>16</td><td>16</td><td>40</td>';
  tr4.innerHTML = `<td><label>${input4.outerHTML}Custom</label></td>${td2.outerHTML}${td3.outerHTML}${td4.outerHTML}`;
  
  // Build the HTML structure
  tbody.appendChild(tr1);
  tbody.appendChild(tr2);
  tbody.appendChild(tr3);
  tbody.appendChild(tr4);
  table.appendChild(thead);
  table.appendChild(tbody);
  form.appendChild(table);
  button.appendChild(label5);
  form.appendChild(button);
  section.appendChild(inputFormMode);
  section.appendChild(form);
  main.appendChild(inputGameMode);
  header.appendChild(outputMineCounter);
  buttonRestart.appendChild(label6);
  header.appendChild(buttonRestart);
  header.appendChild(outputTimer);
  main.appendChild(header);
  tableBoard.appendChild(tbodyBoard);
  main.appendChild(tableBoard);

// Append the HTML structure to the body
document.body.appendChild(section);
document.body.appendChild(main);

