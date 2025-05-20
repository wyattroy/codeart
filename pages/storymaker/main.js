import { stages } from "./content.js";
import { StoryGuide } from './StoryGuide.js';

const guide = new StoryGuide(stages);

// guide.stages.forEach(() => guide.nextStage());  

function addText() {
    const textbox = document.getElementById('textbox');
    const textarea = document.getElementById('textarea');
    textarea.value += textbox.value + '\n';
    textbox.value = '';
    
    document.getElementById('textbox').placeholder = "Write here...";
    document.getElementById('addText').innerHTML = "Next";

    console.log('Current Stage Index: ' + guide.currentStageIndex);
    console.log(stages.length);
    if (guide.currentStageIndex === stages.length) {
        document.getElementById('textbox').placeholder = "The end!";
        document.getElementById('addText').innerHTML = "The end!";

    }

    textarea.scrollTop = textarea.scrollHeight;

    guide.nextStage();
}
  
window.addText = addText;

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('textbox').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            addText();
            document.getElementById('textbox').focus();
            document.getElementById('textbox').innerHTML = '';
            // doccument.getElementById('textarea').focus();
        }
    });
});