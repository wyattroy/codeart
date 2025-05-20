// Prompt.js
export class Prompt {
  constructor(description, generator) {
    this.description = typeof description === 'function' ? description() : description;
    this.generator = generator;
    this.answer = '';
  }

  generate() {
    this.answer = this.generator();
  }
}