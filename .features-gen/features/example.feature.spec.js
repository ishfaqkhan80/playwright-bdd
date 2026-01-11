// Generated from: features\example.feature
import { test } from "playwright-bdd";

test.describe('Playwright Hjemmeside', () => {

  test('Besøk Playwright hjemmeside', async ({ Given, When, Then, page }) => { 
    await Given('at jeg er på Playwright hjemmesiden', null, { page }); 
    await When('jeg ser på sidetittelen', null, { page }); 
    await Then('skal tittelen inneholde "Playwright"', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features\\example.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":4,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Gitt at jeg er på Playwright hjemmesiden","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":6,"keywordType":"Action","textWithKeyword":"Når jeg ser på sidetittelen","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"Så skal tittelen inneholde \"Playwright\"","stepMatchArguments":[{"group":{"start":24,"value":"\"Playwright\"","children":[{"start":25,"value":"Playwright","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end