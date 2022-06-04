"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const msgSuccess = "Grille valide";
const msgFailure = "Grille invalide";
const file = (_a = process.argv[2]) !== null && _a !== void 0 ? _a : "example.txt";
let textInput = fs_1.default.readFileSync(`./${file}`);
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
            let block = [];
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
function hasAllNumbers(input) {
    if (input.length != 9) {
        console.error("There is a line without 9 numbers in it!");
        return;
    }
    for (let i = 1; i <= 9; i++)
        if (input.indexOf(i) == -1)
            failure();
}
function failure() {
    console.log(msgFailure);
    process.exit();
}
function inputToNumberMatrix(input) {
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
