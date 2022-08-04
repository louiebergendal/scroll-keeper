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
    getHistory: (state) => state.history,
    getSheet: (state) =>  state.sheet,
    getAttributes: (state) => state.sheet.attributes,
    getCompetence: (state) => state.sheet.competence,
    getTraits: (state) => state.sheet.traits,
    getLevel: (state) => state.metadata.currentLevel,
    getName: (state) => state.metadata.name,
    getState: (state) => state.sheet.state,
    getMaxHealth: (state) => state.maxHealthValue,
    getHealth: (state) => state.sheet.health,
    getCurrentStrain: (state) => state.sheet.state.currentStrain
  }
})

export default {
  computed: {
    ...mapStores(useStore),
    ...mapState(useStore, [
      'getHistory',
      'getSheet',
      'getAttributes',
      'getCompetence',
      'getTraits',
      'getLevel',
      'getName',
      'getState',
      'getMaxHealth',
      'getHealth',
      'getCurrentStrain'
    ]),
  }
}
