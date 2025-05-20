// StoryStage.js
export class StoryStage {
  constructor(title, prompts) {
    this.title = title;
    this.prompts = prompts;
  }

  generatePrompts() {
    this.prompts.forEach(prompt => prompt.generate());
  }

  render() {
    console.log(`Stage: ${this.title}`);
    document.getElementById('promptTitle').innerText = `Stage: ${this.title}`;
    
    document.getElementById('promptDescription').innerHTML = '';
    this.prompts.forEach(prompt => {
      console.log(`${prompt.description}: ${prompt.answer}`);
      document.getElementById('promptDescription').innerHTML += `${prompt.description}: ${prompt.answer} <br/>`;
    });
  }
}