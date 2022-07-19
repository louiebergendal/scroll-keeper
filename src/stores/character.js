import { defineStore, mapState, mapStores } from 'pinia'

import { VilleVakt } from '../mocks/mockCharacterHistory';
import { flattenCharacter } from '../utilities/characterFlattener';

export const useStore = defineStore('activeCharacter', {
  state: () => {
    const characterHistory = VilleVakt // HÅRDKODAD MOCK
    const characterSheet = flattenCharacter(characterHistory)
    return {
      metadata: characterHistory.metadata,
      sheet: characterSheet,
      history: characterHistory.history
    }
  },
  getters: {
    characterHistory: (state) => state.history,
    characterSheet: (state) =>  state.sheet,
    characterTraits: (state) => state.sheet.traits,
    characterSkills: (state) => state.sheet.skills,
    //characterTalents: (state) => state.sheet.talents,
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
      'characterTraits',
      //'characterSkills',
      'characterTalents',
      'characterLevel',
      'characterName'
    ]),
  }
}
