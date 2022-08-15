let n_grid_squares = 16;

const sketchpad = document.querySelector("#sketchpad");
const sketchpad_size = "480px";
const n_sketchpad_size = parseInt(sketchpad_size);

sketchpad.style.height =  sketchpad_size;
sketchpad.style.width = sketchpad_size;

function createGrid(grid_size) {
    // Remove everything
    sketchpad.innerHTML = "";

    // Add grid squares
    let sq_height_width = `${n_sketchpad_size / n_grid_squares}px`;

    // Add row
    for(let row = 0; row < grid_size; row++) {
        let tmp_row = document.createElement("div");
        tmp_row.classList.add("row");

        // Add columns for the row
        for(let col = 0; col < grid_size; col++) { 
            tmp_col = document.createElement("div");
            tmp_col.style.height = sq_height_width;
            tmp_col.style.width = sq_height_width;
            tmp_col.classList.add("sketchpad-col");

            tmp_col.addEventListener("mouseover", function(e) { 
                let tar_el = e.target;
                if(!tar_el.classList.contains("sketchpad-col-marked")) {
                    tar_el.classList.add("sketchpad-col-marked");
                }
                else {
                    let tmp_opac = +window.getComputedStyle(tar_el).getPropertyValue("opacity");
                    tar_el.style.opacity = (tmp_opac < 1) ? tmp_opac + 0.1 : tmp_opac;
                }
            });
            
            // Append column to row
            tmp_row.appendChild(tmp_col);
        }
        // Append row to container
        sketchpad.appendChild(tmp_row);
    }
}

function resetGrid() {
    // Prompt the user for a number
    n_grid_squares = promptForNumber(1, 100);
    createGrid(n_grid_squares);
}

function promptForNumber(minimum, maximum) { 
    let prompt_q = `Enter a number between ${minimum} and ${maximum}`;
    let user_ans = 16;
    while(true) {
        user_ans = +prompt(prompt_q);
        
        // User did not enter a valid number
        if(!user_ans) {
            continue;
        }

        // User entered a valid number
        if(user_ans > maximum) {
            prompt_q = `Too big! Enter a number between ${minimum} and ${maximum}`;
            continue;
        }
        else if(user_ans < minimum) {
            prompt_q = `Too small! Enter a number between ${minimum} and ${maximum}`;
            continue;
        }

        // User entered a number betweeen minimum and maximum
        else {
            break;
        }
    }
    return user_ans;
}


// Create initial grid
createGrid(n_grid_squares);
