import fs from "fs";

const msgSuccess = "Grille valide";
const msgFailure = "Grille invalide";

const file = process.argv[2] ?? "example.txt";
let textInput = fs.readFileSync(`./${file}`);

let sudokuMatrix = inputToNumberMatrix(textInput);

mainTests();

function mainTests() {
  // Lines tests
  sudokuMatrix.forEach(hasAllNumbers);

  // Columns tests
  for (let i = 0; i < 9; i++) {
    let c = sudokuMatrix.map((l) => l[i]);
    hasAllNumbers(c);
  }

  for (let blockLine = 0; blockLine < 3; blockLine++) {
    for (let blockCol = 0; blockCol < 3; blockCol++) {
      let block = [] as number[];
      for (let line = 0; line < 3; line++) {
        for (let col = 0; col < 3; col++) {
          block.push(sudokuMatrix[line + blockLine * 3][col + blockCol * 3]);
        }
      }
      hasAllNumbers(block);
    }
  }

  console.log(msgSuccess);
}

function hasAllNumbers(input: number[]): void {
  if (input.length != 9) {
    console.error("There is a line without 9 numbers in it!");
    return;
  }
  for (let i = 1; i <= 9; i++) if (input.indexOf(i) == -1) failure();
}

function failure() {
  console.log(msgFailure);
  process.exit();
}

function inputToNumberMatrix(input: Buffer): number[][] {
  let lines = input.toString().split(/\r?\n/);
  lines = lines.slice(0, 9);

  let mtx = lines.map((l) => {
    return l.split("");
  });

  return mtx.map((l) => {
    return l.map((c) => {
      return parseInt(c);
    });
  });
}
