import fs from "fs";

// Cleaner than hard-coding return messages
const msgSuccess = "Grille valide";
const msgFailure = "Grille invalide";

// Possibility of using a custom filename
const file = process.argv[2] ?? "example.txt";
let textInput = fs.readFileSync(`./${file}`);

// Transforming a text file into a number matrix
let sudokuMatrix = inputToNumberMatrix(textInput);

// Less cumbersome than just running tests in the middle of the code
mainTests();

function mainTests() {
  // Lines tests
  sudokuMatrix.forEach(hasAllNumbers);

  // Columns tests
  for (let i = 0; i < 9; i++) {
    let c = sudokuMatrix.map((l) => l[i]);
    hasAllNumbers(c);
  }

  // 3x3 blocks tests
  // We iterate every block, from left to right, and going down
  for (let blockLine = 0; blockLine < 3; blockLine++) {
    for (let blockCol = 0; blockCol < 3; blockCol++) {
      // Each block can just be an array of number, no need for a full matrix
      let block = [] as number[];
      // Iterate a 3x3 square
      for (let line = 0; line < 3; line++) {
        for (let col = 0; col < 3; col++) {
          // And populate the array, offsetting by the current block's position
          block.push(sudokuMatrix[line + blockLine * 3][col + blockCol * 3]);
        }
      }
      hasAllNumbers(block);
    }
  }

  // If nothing's made the process exit by then, it means the sudoku is correct
  console.log(msgSuccess);
}

// Helper function to test an array of 9 numbers
function hasAllNumbers(input: number[]): void {
  if (input.length != 9) {
    console.error("There is a line without 9 numbers in it!");
    // Exit the function if the input isn't valid
    // TODO: This should be a failure, not just a return
    return;
  }
  // Iterate through the 9 numbers, and if one isn't found, then the array isn't valid
  for (let i = 1; i <= 9; i++) if (input.indexOf(i) == -1) failure();
}

// Helper function to exit the program
function failure() {
  // "Grille invalide"
  console.log(msgFailure);
  // No need to run through the program any further if an invalid part was found
  process.exit();
}

// Helper function to convert a file like example.txt into a 9x9 matrix of digits
function inputToNumberMatrix(input: Buffer): number[][] {
  // Make an array of lines out of the file (accounting for different return characters)
  let lines = input.toString().split(/\r?\n/);
  // Just keep the 9 first lines, so that an extra trailing \n doesn't ruin everything
  lines = lines.slice(0, 9);

  // Make a matrix, making an array out of every element of the array
  let mtx = lines.map((l) => {
    return l.split("");
  });

  // Return a matrix of integers, so that TypeScript type checking doesn't freak out
  return mtx.map((l) => {
    return l.map((c) => {
      return parseInt(c);
    });
  });
}
