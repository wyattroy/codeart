
document.addEventListener("DOMContentLoaded", function(){

    document.querySelector("title").innerHTML = "Typewriter";

    document.querySelector("#navbar").innerHTML = `

        <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#"></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                <a class="nav-link" href="index">Home</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="who">Who</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="why">Why</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="how">How</a>
                </li>
            </ul>
            </div>
        </div>
        </nav>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
        `;

    // Set the typing area
    let typingarea = document.querySelector("#typingarea");

    // Start the cursor blinking in the middle
    window.onload = function() {
        typingarea.focus();
    };

    // Clear the helper text when the user clicks in the box
    typingarea.addEventListener("focus", function(){
        typingarea.value = "";
    });

    // Initialize the typed page and the content that'll go there
    let typedpage = document.querySelector("#typedpage");
    let content = "";

    // When the user starts typing...
    typingarea.addEventListener("keydown", function(event){

        // If they pressed enter, don't show it -- just add a br
        if (event.key == 'Enter'){
            event.preventDefault();
            content += "<br/>"
        }

        // If they hit a non-printable key, ignore it.
        else if (!(/^[\x20-\x7E]$/.test(event.key)))
            {
            event.preventDefault();
            console.log("Event key: "+ event.key);
        }
        // Otherwise, add their character to the string being printed out!
        else
        {
            content += event.key;
        }

        // Make sure there's actually content or else it'll print Undefined
        if (content != null)
            {
                typedpage.innerHTML = content;
            }

        // Reset the typing area so it only holds one character
        typingarea.value = "";
    });
})



