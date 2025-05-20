
// StoryGuide.js
export class StoryGuide {
  constructor(stages) {
    this.stages = stages;
    this.currentStageIndex = 0;
  }

  startStory() {
    this.stages[0].render();
  }

  nextStage() {
    if (this.currentStageIndex < this.stages.length) {
      this.stages[this.currentStageIndex].render();
      this.currentStageIndex++;
    }
  }


}


  