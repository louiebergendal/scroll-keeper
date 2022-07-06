import { defineStore } from 'pinia'

import { VilleVakt } from '../mocks/mockCharacterHistory';
import { flattenCharacter } from '../utilities/characterFlattener';

export const useStore = defineStore('activeCharacter', {
  state: () => {
    const characterHistory = VilleVakt // HÅRDKODAT
    const characterSheet = flattenCharacter(VilleVakt) // HÅRDKODAT
    return {
      characterSheet: characterSheet,
      characterHistory: characterHistory
    }
  }
})