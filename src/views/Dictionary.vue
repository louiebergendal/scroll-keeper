<template>
  <div class="flex">
    <div
      class="width-half margin-right-small margin-left-large margin-top-large"
    >
      <div class="card dark width-whole padding-medium">
        <h2 class="padding-left-small padding-top-small margin-bottom-tiny">
          New Word
        </h2>
        <form class="flex -h-spread -wrap padding-small">
          <div class="width-half-minus-tiny">
            <input
              type="text"
              placeholder="English"
              class="width-whole margin-bottom-small"
              v-model="englishWord"
            />
          </div>
          <div class="width-half-minus-tiny">
            <input
              type="text"
              placeholder="Vendi"
              class="width-whole margin-bottom-small"
              v-model="conlangWord"
            />
          </div>
          <div class="width-half-minus-tiny">
            <input
              type="text"
              placeholder="Phonetic"
              class="width-whole margin-bottom-small"
              v-model="phoneticWord"
            />
          </div>
          <div class="width-half-minus-tiny">
            <select
              placeholder="Word class"
              class="width-whole margin-bottom-small"
              v-model="wordClass"
            >
              <option disabled value="">Please select one</option>
              <option
                v-for="wordClass in wordClasses"
                :value="wordClass.value"
                :key="wordClass.value"
              >
                {{ wordClass.name }}
              </option>
            </select>
          </div>
          <div class="width-whole">
            <textarea
              type="text"
              placeholder="Description (Optional)"
              class="width-whole margin-bottom-small"
              v-model="description"
            ></textarea>
          </div>
        </form>
        <p class="align-right">
          <button :disabled="isDisabled" @click="addToDictionary">
            Submit
          </button>
        </p>
      </div>
      <template v-if="selectedWordFull">
        <div class="card dark width-whole padding-medium margin-top-large">
          <h2 class="padding-left-small padding-top-small margin-bottom-tiny">
            Selected Word
          </h2>
          <div class="flex -h-spread -wrap padding-small">
            <div class="width-half-minus-tiny">
              <h3>English</h3>
              <p class="margin-bottom-small">
                {{ selectedWordFull.englishWord }}
              </p>
            </div>
            <div class="width-half-minus-tiny">
              <h3>Vendi</h3>
              <p class="margin-bottom-small">
                {{ selectedWordFull.conlangWord }}
              </p>
            </div>
            <div class="width-half-minus-tiny">
              <h3>Phonetic</h3>
              <p class="margin-bottom-small">
                {{ selectedWordFull.phoneticWord }}
              </p>
            </div>
            <div class="width-half-minus-tiny">
              <h3>Word Class</h3>
              <p class="margin-bottom-small">
                {{ selectedWordFull.wordClass }}
              </p>
            </div>
            <div v-if="selectedWordFull.description" class="width-whole">
              <h3>Description</h3>
              <p class="margin-bottom-small">
                {{ selectedWordFull.description }}
              </p>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div
      class="card dark width-half padding-medium margin-left-small margin-right-large margin-top-large"
    >
      <h2 class="padding-left-small padding-top-small margin-bottom-tiny">
        Dictionary
      </h2>
      <div
        class="flex padding-tiny padding-left-small padding-right-small padding-top-small"
      >
        <div class="width-third-minus-tiny"><h3>Vendi</h3></div>
        <div class="width-third-minus-tiny"><h3>Phonetic</h3></div>
        <div class="width-third-minus-tiny"><h3>English</h3></div>
      </div>
      <div
        class="flex padding-tiny dictionary-word padding-left-small padding-right-small"
        v-for="(word, key) in dictionary"
        :class="{ selected: selectedWordKey === key }"
        @click="selectWord(key)"
        :key="key"
      >
        <div class="width-third-minus-tiny">{{ word.conlangWord }}</div>
        <div class="width-third-minus-tiny">{{ word.phoneticWord }}</div>
        <div class="width-third-minus-tiny">{{ word.englishWord }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref as vRef } from "vue";
import {
  ref as fbRef,
  getDatabase,
  push,
  get,
  onValue,
} from "firebase/database";

export default {
  setup() {
    const db = getDatabase();

    const englishWord = vRef("");
    const phoneticWord = vRef("");
    const conlangWord = vRef("");
    const wordClass = vRef("");
    const description = vRef("");

    const dictionary = vRef({});
    const selectedWordKey = vRef("");
    const selectedWordFull = vRef({});

    const wordClasses = [
      { value: "noun", name: "Noun" },
      { value: "pronoun", name: "Pronoun" },
      { value: "verb", name: "Verb" },
      { value: "adjective", name: "Adjective" },
      { value: "adverb", name: "Adverb" },
      { value: "preposition", name: "Preposition" },
      { value: "conjunction", name: "Conjunction" },
      { value: "interjection", name: "Interjection" },
      { value: "prefix", name: "Prefix" },
      { value: "suffix", name: "Suffix" },
    ];

    // Vendi hardcoded
    const dictionaryRefString = "dictionaries/vendi/words";

    return {
      db,
      dictionary,
      dictionaryRefString,
      englishWord,
      phoneticWord,
      conlangWord,
      wordClass,
      description,
      wordClasses,
      selectedWordKey,
      selectedWordFull,
    };
  },
  mounted() {
    this.setDictionaryListener();
  },
  computed: {
    isDisabled() {
      // lol let's just trust the system bro
      let disable = false;
      if (!this.englishWord) disable = true;
      if (!this.phoneticWord) disable = true;
      if (!this.conlangWord) disable = true;
      if (!this.wordClass) disable = true;
      return disable;
    },
  },
  methods: {
    setDictionaryListener() {
      // Vendi hardcoded applies here
      // Database contact onValue() updates at data renew
      const dictionaryRef = fbRef(this.db, this.dictionaryRefString);
      onValue(dictionaryRef, (snapshot) => {
        this.dictionary = snapshot.val();
        // return this.dictionary;
      });
    },
    writeDictionaryEntry(word) {
      // Vendi hardcoded applies here
      // Database contact single use "write" to db
      const dictionaryRef = fbRef(this.db, this.dictionaryRefString);
      push(dictionaryRef, word);
    },
    addToDictionary() {
      let newWord = {
        decription: this.description,
        englishWord: this.englishWord,
        phoneticWord: this.phoneticWord,
        conlangWord: this.conlangWord,
        wordClass: this.wordClass,
      };
      this.writeDictionaryEntry(newWord);
    },
    emptyAllFields() {
      [
        this.description,
        this.englishWord,
        this.phoneticWord,
        this.conlangWord,
        this.wordClass,
      ].forEach((field) => {
        field = "";
      });
    },
    selectWord(key) {
      // Database contact get() = single use
      this.selectedWordKey = key;
      const ref = fbRef(this.db, this.dictionaryRefString + "/" + key);
      get(ref).then((snapshot) => {
        if (snapshot.exists()) {
          this.selectedWordFull = snapshot.val();
        }
      });
    },
  },
};
</script>

<style></style>
