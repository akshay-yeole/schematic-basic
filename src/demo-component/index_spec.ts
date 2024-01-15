import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import * as path from 'path';

const collectionPath = path.join(__dirname, '../collection.json');

describe('demo-component', () => {

  const runner = new SchematicTestRunner('schematics', collectionPath);
  
  let appTree : UnitTestTree;
  
  const workspaceOptions : any ={
    name : 'workspace',
    newProjectRoot : 'projects',
    version : '0.5.0'
  };

  const appOptions : any ={
    name :'schematest'
  };

  const schemaOptions : any ={
    name:'foo'
  };


  beforeEach( async () =>{
    appTree = await runner.runExternalSchematic('@schematics/angular', 'workspace', workspaceOptions);
    appTree = await runner.runExternalSchematic('@schematics/angular', 'application', appOptions,appTree);
  });

  it('works', async () => {
    const tree = await runner.runSchematic('demo-component', schemaOptions, appTree);
    const appComponentTs = tree.readContent('/projects/schematest/src/app/app.component.ts'); 
    expect(appComponentTs).toContain(`name = '${schemaOptions.name}'`);
  });
  
});
