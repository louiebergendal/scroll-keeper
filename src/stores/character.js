import { defineStore, mapState, mapStores } from 'pinia'

import { VilleVakt } from '../mocks/mockCharacterHistory';
import { flattenCharacter } from '../utilities/characterFlattener';

/* 
  to be used in views 
*/

export const useStore = defineStore('activeCharacter', {
  state: () => {
    const characterHistory = VilleVakt // HÅRDKODAD MOCK
    const characterSheet = flattenCharacter(characterHistory)

    console.log('characterSheet: ', characterSheet);
    return {
      metadata: characterHistory.metadata,
      sheet: characterSheet,
      history: characterHistory.history
    }
  },
  getters: {
    characterHistory: (state) => state.history,
    characterSheet: (state) =>  state.sheet,
    characterAttributes: (state) => state.sheet.attributes,
    characterTraits: (state) => state.sheet.traits,
    characterLevel: (state) => state.metadata.currentLevel,
    characterName: (state) => state.metadata.name
  }
})

export default {
  computed: {
    ...mapStores(useStore),
    ...mapState(useStore, [
      'characterHistory',
      'characterSheet',
      'characterAttributes',
      'characterTraits',
      'characterLevel',
      'characterName'
    ]),
  }
}
