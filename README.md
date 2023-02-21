# Omen RPG manager by Louie Bergendal and Leo Ryberg
Scroll-Keeper is a web application made for Omen; a tabletop RPG played with dice, pen, paper, and, in the future, this app. 
This application imitates the non-digital rules exactly, and the game is developed "paper and pen first". 
Updates to this project are regular, on an approximately bi-weekly to monthly basis.

## Overview:
So far, the system is built mostly to facilitate character creation and management, but it will in the future include other features, like interactive maps, rulebooks, and so on.

## Ruleset:
The repo includes a directory of rules (identical to those in the tabletop version) that will be split into a separate library at some point and made available to users who want to build their own apps for this game system.
The ruleset should be without any external dependencies, and function as a standalone js lib containing all the actual game mechanics.
Right now, the repo is shared but will not be so in the future. So far this is easier.

## Character management:
A character is saved as a numbered list of levels, together with the choices made on that level. This data is saved in Firebase.
When a character history is loaded, the history is used to generate a final character sheet, according to the currently applied version of the ruleset, and the system will find and report any rules-illegal choices while generating the character.

Leveling and editing of a character are done in the level ladder (not the character sheet), and this level ladder/leveling module has extensive error handling and user guidance. By "errors" in this context, this word refers to character choices that in one way or another break the rules of the game - not code errors or invalid inputs in the usual manner.

The level ladder stops a user from making directly illegal choices. However, by changing the choice made at a previous level (which is sometimes necessary), the user can make their own future choices illegal, and the system is built to manage these "not-disallowed-but-it-results-in-errors-elsewhere" issues, and fully inform the user about the rule-relevant consequences of their choices.

The error handling takes care of the following cases and knows how to distinguish between them. The system tells the user the following:

- That an invalid choice (according to the currently applied ruleset) has been made at the selected level, and the reason for that error (i.e unfulfilled   requirements for the selected choice and so on).

- That a trait or attribute is "Touched by error", meaning that the trait is affected by an error at another level, but not the selected one, and in this case,  the system tells the user what future or past level the error occurs at.

- That the ruleset library has been updated, and that such a change has invalidated one or more of the previously made choices.

- That a trait is chosen at a later level (taking the trait at this level, while legal, will make the later trait-pick illegal, since a character can only pick a trait once).

## Tech stack:
Vite, Vue3, Typescript.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
