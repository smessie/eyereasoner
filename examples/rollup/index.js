import { loadEyeImage, SWIPL, queryOnce } from 'eyereasoner';

document.addEventListener('click', async function (event) {
  if (event.target.id === 'execute') {
    let result = '';
    const SwiplEye = loadEyeImage(SWIPL);

    // Instantiate a new SWIPL module and add results to the result string
    const Module = await SwiplEye({ print: (str) => { result += str + '<br>' }, arguments: ['-q'] });
  
    // Load the the strings data and query as files data.n3 and query.n3 into the module
    Module.FS.writeFile('data.n3', document.getElementById("data").value);
    Module.FS.writeFile('query.n3', '{?S ?P ?O} => {?S ?P ?O}.');
    
    // Execute the query
    queryOnce(Module, 'main', ['--nope', '--quiet', './data.n3', '--query', './query.n3']);

    // Put the result in the DOM
    document.getElementById("result").innerHTML = result;
  }
});
