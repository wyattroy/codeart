import { StoryStage } from './StoryStage.js';
import { Prompt } from './Prompt.js';
import { RandomGenerator } from './RandomGenerator.js';


export const stages = [];

const characterIntroStage = new StoryStage('1. Character Introduction', [
  new Prompt("Our hero's name starts with", () => RandomGenerator.randomCombo()),
  new Prompt('Their biggest fear is a', () => RandomGenerator.randomNoun()),
  new Prompt('Their favorite object', () => RandomGenerator.randomNoun()),
  new Prompt('And their homeland is known for its', () => RandomGenerator.randomNoun()),
]);
characterIntroStage.generatePrompts();
stages.push(characterIntroStage);

let protagonist = characterIntroStage.prompts[0].answer;

const callToAdventure = new StoryStage('2. Call To Adventure', [
  new Prompt('They have a', () => `${RandomGenerator.randomTrait()} ${RandomGenerator.randomRelation()}`),
  new Prompt('Whose name starts with', () => RandomGenerator.randomCombo()),
  new Prompt('Unfortunately they are in a lot of trouble/very sick and the only cure is a rare', () => RandomGenerator.randomNoun())
]);
callToAdventure.generatePrompts();
stages.push(callToAdventure);

let cure = callToAdventure.prompts[2].answer;

const refusalStage = new StoryStage('3. Refusal of the Call', [
  new Prompt(() => `${protagonist} wants to help, but the ${cure} is somehow guarded by someone who possesses their greatest fear`, () => characterIntroStage.prompts[1].answer),
]);
refusalStage.generatePrompts();
stages.push(refusalStage);

let fear = refusalStage.prompts[0].answer;

const meetingMentorStage = new StoryStage('4. Meeting the Mentor', [
    new Prompt('Along comes a', () => `${RandomGenerator.randomTrait()} ${RandomGenerator.randomRelation()}`),
    new Prompt('Whose name begins with', () => RandomGenerator.randomCombo()),
    new Prompt('Who mentors them how to use a', () => `${RandomGenerator.randomNoun()} to overcome the scary ${characterIntroStage.prompts[1].answer}`),
]);
meetingMentorStage.generatePrompts();
stages.push(meetingMentorStage);

let mentor = meetingMentorStage.prompts[1].answer;

const leavingMentorStage = new StoryStage('5. Leaving the Mentor', [
    new Prompt(() => `${mentor} the mentor leaves because of business involving a`, () => RandomGenerator.randomNoun()),
    new Prompt(() => `${callToAdventure.prompts[1].answer}, their ${callToAdventure.prompts[0].answer}`, () => `gets sicker due to a ${RandomGenerator.randomNoun()} hurting them`),
    new Prompt(() => `${protagonist} must venture out alone in search of the rare`, () => `${cure}`),
]);
leavingMentorStage.generatePrompts();
stages.push(leavingMentorStage);

const trialsStage = new StoryStage('6. Trials', [
    new Prompt('An enemy appears, weilding a powerful', () => RandomGenerator.randomNoun()),
    new Prompt('An ally comes to help, named', () => RandomGenerator.randomCombo()),
]);
trialsStage.generatePrompts();
stages.push(trialsStage);

let ally = trialsStage.prompts[1].answer;

const innermostCaveStage = new StoryStage('7. Innermost Cave', [
    new Prompt('They travel for', () => `${Math.floor(Math.random() * 100)} minutes/days`),
    new Prompt('Across lands filled with', () => `${RandomGenerator.randomNoun()}, ${RandomGenerator.randomNoun()} and ${RandomGenerator.randomNoun()}`),
    new Prompt('Until they reach the innermost cave, where they find the', () => `${cure} guarded by a ${fear}`),
]);
innermostCaveStage.generatePrompts();
stages.push(innermostCaveStage);

const lossStage = new StoryStage('8. Loss', [
    new Prompt(() => `${protagonist} loses almost everything while battling against the`, () => `${fear}`),
    new Prompt('They even almost lose their friend and ally', () => `${ally} in a brutal fight`),
]);
lossStage.generatePrompts();
stages.push(lossStage);

const rewardStage = new StoryStage('9. Reward', [
    new Prompt('Truly alone and unarmed, they remember what their mentor', () => `${mentor} taught them`),
    new Prompt('And they realize that they have the power within them to evade/defeat', () => `${fear}`),
]);
rewardStage.generatePrompts();
stages.push(rewardStage);

const finalAttemptStage = new StoryStage('10. Final Attempt', [
    new Prompt(()=> `${protagonist} tries one more time. They lose`, () => `${Math.floor(Math.random() * 100)}% of their health, but they succeed in defeating the ${fear}`),
    new Prompt('And they use their', () => `${RandomGenerator.randomNoun()} to defeat it`),
]);
finalAttemptStage.generatePrompts();
stages.push(finalAttemptStage);

const returnStage = new StoryStage('11. Return', [
    new Prompt(()=> `${protagonist} returns home with ${cure} and gives it to`, () => `${callToAdventure.prompts[1].answer}, their ${callToAdventure.prompts[0].answer}`),
    new Prompt('And they are hailed as a hero by', () => `their mentor ${mentor}, friend ${ally}, and even a random ${RandomGenerator.randomRelation()}`),
    new Prompt('And they live happily ever after with their favorite object', () => characterIntroStage.prompts[2].answer),
]);
returnStage.generatePrompts();
stages.push(returnStage);