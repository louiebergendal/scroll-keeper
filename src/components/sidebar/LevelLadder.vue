<template>
  <div
    :class="{
      closed: isClosed,
      'level-ladder': true,
      flex: true,
      slideInLeft: true,
    }"
  >
    <div class="levels">
      <Wizard
        :start-index="characterStore.metadata.level"
        squared-tabs
        navigable-tabs
        vertical-tabs
        :custom-tabs="levelTabDataList"
        @change="onChangeCurrentTab"
      >
        <div v-for="level in levelList" :key="level.level">
          <div v-if="currentTabIndex === level.level">
            <div v-if="level.levelBonus === 'skill'">
              <TraitLevel
                :selectedLevelProp="currentTabIndex"
                :traitTypeProp="'skill'"
                @update-tabs="updateLevelTabData"
              />
            </div>
            <div v-if="level.levelBonus === 'attribute'">
              <AttributeLevel
                :selectedLevelProp="currentTabIndex"
                @update-tabs="updateLevelTabData"
              />
            </div>
            <div v-if="level.levelBonus === 'talent'">
              <TraitLevel
                :selectedLevelProp="currentTabIndex"
                :traitTypeProp="'talent'"
                @update-tabs="updateLevelTabData"
              />
            </div>
            <div v-if="level.levelBonus === 'fate'">
              <StaticLevel
                :selectedLevelProp="currentTabIndex"
                :characteristicProp="'fate'"
                @update-tabs="updateLevelTabData"
              />
            </div>
            <div v-if="level.levelBonus === 'competence'">
              <StaticLevel
                :selectedLevelProp="currentTabIndex"
                :characteristicProp="'competence'"
                @update-tabs="updateLevelTabData"
              />
            </div>
            <div v-if="level.levelBonus === 'flexible'">
              <tabs class="dark">
                <tab name="Grundegenskap" :status="attributeTabStatus">
                  <AttributeLevel
                    ref="attributeLevelRef"
                    :selectedLevelProp="currentTabIndex"
                    @update-tabs="updateLevelTabData"
                    @selected-level-type="setChildSelectionData"
                  />
                </tab>
                <tab name="Färdighet" :status="traitTabStatus">
                  <TraitLevel
                    ref="traitLevelRef"
                    :selectedLevelProp="currentTabIndex"
                    :traitTypeProp="'skill'"
                    @update-tabs="updateLevelTabData"
                    @selected-level-type="setChildSelectionData"
                  />
                </tab>
              </tabs>
            </div>
          </div>
        </div>
      </Wizard>
    </div>
  </div>
</template>

<script>
import { ref, shallowReactive } from "vue";
import { useCharacterStore } from "../../stores/character";
import experienceTableMaker from "../../rules/experienceTableMaker.js";
import Wizard from "form-wizard-vue3";
import TraitLevel from "../levelChoices/traitLevel/TraitLevel.vue";
import AttributeLevel from "../levelChoices/attributeLevel/AttributeLevel.vue";
import StaticLevel from "../../components/levelChoices/StaticLevel.vue";
import { getTraitNiceName } from "../../rules/characteristics/traits";
import { getAttributeLongName } from "../../rules/characteristics/attributes";
import { containsKey } from "../../rules/utils";
import { getLevelBonusNiceName } from "../../rules/level";
import Tabs from "../generic/tabs/Tabs.vue";

export default {
  components: {
    Wizard,
    AttributeLevel,
    TraitLevel,
    StaticLevel,
    Tabs,
  },
  setup(props) {
    const characterStore = useCharacterStore();
    const experienceTable = ref(
      experienceTableMaker(characterStore.metadata.level + 1)
    );
    const isClosed = ref(true);
    const currentTabIndex = ref(0);
    const levelTabDataList = ref([]);
    const levelList = ref([]);
    const attributeTabStatus = ref("normal");
    const traitTabStatus = ref("normal");
    const currentlySelectedLevelType = ref("");
    const traitLevelRef = ref(null);
    const attributeLevelRef = ref(null);

    return {
      Wizard,
      experienceTable,
      characterStore,
      levelList,
      isClosed,
      levelTabDataList,
      currentTabIndex,
      attributeTabStatus,
      traitTabStatus,
      currentlySelectedLevelType,
      traitLevelRef,
      attributeLevelRef,
    };
  },
  methods: {
    setPluppStatus(levelTypeKey, isInvalid, shouldResetCounterpart = true) {
      let status = "normal";
      switch (levelTypeKey) {
        case "attribute":
          status = "selected";
          status = isInvalid ? "invalid" : status;
          this.attributeTabStatus = status;
          this.traitTabStatus = "normal";
          if (Object.keys(this.$refs).length > 0 && shouldResetCounterpart) {
            this.$refs.traitLevelRef[0].resetSelection();
          }
          break;
        case "trait":
          status = "selected";
          status = isInvalid ? "invalid" : status;
          this.traitTabStatus = status;
          this.attributeTabStatus = "normal";
          if (Object.keys(this.$refs).length > 0 && shouldResetCounterpart) {
            this.$refs.attributeLevelRef[0].resetSelection();
          }
          break;
        default:
          console.log("ERROR: Spelling error in setPluppStatus");
          break;
      }
    },
    setChildSelectionData(data) {
      this.currentlySelectedLevelType = data.type;
      this.setPluppStatus(
        data.type,
        data.isInvalid,
        data.shouldResetCounterpart
      );
    },
    updateLevelTabData() {
      this.experienceTable = experienceTableMaker(
        this.characterStore.metadata.level + 1
      );
      this.levelTabDataList.length = 0;
      this.levelList.length = 0;

      for (let i = 0; i < this.experienceTable.length; i++) {
        const levelIndex = i + 1; // experienceTable is 0-indexed, characterHistory is 1-indexed
        const currentLevel = this.characterStore.history[levelIndex];
        let choice = "";

        if (currentLevel !== undefined) {
          choice = currentLevel.choice;
        }
        let levelBonus = this.experienceTable[i]; // experienceTable is 0-indexed

        const level = {
          level: levelIndex,
          levelBonus: levelBonus,
          hasChosen: currentLevel !== undefined,
          choice: choice,
        };

        let levelTabData = levelBonus;
        let niceName = "";
        if (currentLevel !== undefined) {
          if (levelBonus === "skill" || levelBonus === "talent") {
            niceName = getTraitNiceName(choice);
            levelTabData = getLevelBonusNiceName(levelBonus) + ": " + niceName;
          } else if (levelBonus === "attribute") {
            niceName = getAttributeLongName(choice);
            levelTabData = getLevelBonusNiceName(levelBonus) + ": " + niceName;
          } else if (levelBonus === "flexible") {
            if (getAttributeLongName(choice)) {
              niceName = getAttributeLongName(choice);
            }
            if (getTraitNiceName(choice)) {
              niceName = getTraitNiceName(choice);
            }
            levelTabData = getLevelBonusNiceName(levelBonus) + ": " + niceName;
          } else {
            // Fate'n stuff
            levelTabData = getLevelBonusNiceName(levelBonus);
          }
        } else {
          levelTabData = "Välj " + getLevelBonusNiceName(levelBonus);
        }

        // Keep this absolute and total hack
        // for as long as we use the wizardStep plug
        // as an external dependency -
        // the creator is still updating it (nov 2022)

        const containsInvalidChoice = containsKey(
          levelIndex.toString(),
          Object.keys(this.characterStore.metadata.invalidLevels)
        );
        const levelindexIsClicked = levelIndex === this.currentTabIndex;

        // default
        let levelTabItem = { title: levelTabData, id: levelIndex };
        // invalid
        if (containsInvalidChoice && levelIndex !== 1) {
          levelTabItem = {
            title: levelTabData,
            id: levelIndex + "-" + "invalidStep",
          };
        }
        // clicked
        if (levelindexIsClicked) {
          levelTabItem = {
            title: levelTabData,
            id: levelIndex + "-" + "selectedStep",
          };
        }
        // clicked and invalid
        if (levelindexIsClicked && containsInvalidChoice && levelIndex !== 1) {
          levelTabItem = {
            title: levelTabData,
            id: levelIndex + "-" + "selectedInvalidStep",
          };
        }
        if (!level.hasChosen) {
          levelTabItem = {
            title: levelTabData,
            id: levelIndex + "-" + "nextLevelStep",
          };
        }
        if (!level.hasChosen && levelindexIsClicked) {
          levelTabItem = {
            title: levelTabData,
            id: levelIndex + "-" + "selectedNextLevelStep",
          };
        }

        this.levelTabDataList.push(levelTabItem);
        this.levelList.push(level);
      }
    },
    onChangeCurrentTab(index) {
      this.currentTabIndex = index + 1;
      this.updateLevelTabData();
    },
  },
};
</script>

<style lang="scss">
@import "../../assets/wizard/form-wizard-vue3.scss";
</style>
