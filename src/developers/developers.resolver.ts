import { Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Developer } from 'src/schema.generated';

@Resolver('Developer')
export class DevelopersResolver {
  private readonly developersList: Developer[] = [
    { name: 'Harry', stack: ['rust', 'typescript'] },
  ];

  @Query()
  async developers() {
    return this.developersList;
  }

  // as with normal apollo, this overrides the fields returned in the query resolver
  @ResolveField('stack')
  async generateStack() {
    const languages = ['rust', 'node', 'typescript', 'java', 'go'];
    const toReturn = [];
    const genIndex = () => ~~(Math.random() * languages.length);
    const numLanguages = genIndex();
    for (let i = 0; i <= numLanguages; i++) {
      let curLang = languages[genIndex()];
      while (toReturn.includes(curLang)) {
        curLang = languages[genIndex()];
      }
      toReturn.push(curLang)
    }
    return toReturn;
  }
}
