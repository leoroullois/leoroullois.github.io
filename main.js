const chessBoard = [
    ["A1","B1","C1","D1","E1","F1","G1","H1"],
    ["A2","B2","C2","D2","E2","F2","G2","H2"],
    ["A3","B3","C3","D3","E3","F3","G3","H3"],
    ["A4","B4","C4","D4","E4","F4","G4","H4"],
    ["A5","B5","C5","D5","E5","F5","G5","H5"],
    ["A6","B6","C6","D6","E6","F6","G6","H6"],
    ["A7","B7","C7","D7","E7","F7","G7","H7"],
    ["A8","B8","C8","D8","E8","F8","G8","H8"],
];
const ball = "<div class='ball'></div>";
const newGameFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
class ChessGame {
    constructor(fen=newGameFen) {
        let splitedFen = fen.split(" ");
        this._position = splitedFen[0];
        this._color = splitedFen[1];
        this._castle = splitedFen[2];
        this._enPassant = splitedFen[3];
        this._halfMove = splitedFen[4];
        this._fullMove = splitedFen[5];
    }
    getFen() {
        return this._position+" "+this._color+" "+this._castle+" "+this._enPassant+" "+this._halfMove+" "+this._fullMove;
    }
}
class Pawn {
    constructor(color,actualPos) {
        this._color = color,
        this._name="Pawn",
        this._actualPos=actualPos
    }
    getHTML() {
        return document.querySelector(`#${this._actualPos}`);
    }
    possiblePos() {
        let positions = [];
        let s;
        if (this._color=="black") {
            s=1;
        } else {
            s=-1;
        }
        const id= this.id;
        const upPos = document.querySelector(`#${changePosition(id,0,1)}`);
        const upUpPos = document.querySelector(`#${changePosition(id,0,2)}`);
        if (!upPos.hasChildNodes()) {
            console.log(`Peut bouger en ${upPos.id}`);
            positions.push(upPos.id);
        }
        if (!upUpPos.hasChildNodes()) {
            console.log(`Peut bouger en ${upUpPos.id}`);
            positions.push(upUpPos.id);
        }
        return positions;
    }
    move() {
        console.log(this.possiblePos());
        displayBalls(this.possiblePos());
    }
};
class Knight {
    constructor(color,place) {
        this.color = color,
        this.name="Cavalier",
        this.place=place
    }
};
class Bishop {
    constructor(color,place) {
        this.color = color,
        this.name="Fou",
        this.place=place
    }
};
class Rook {
    constructor(color,place) {
        this.color = color,
        this.name="Tour",
        this.place=place
    }
};
class Queen {
    constructor(color,place) {
        this.color = color,
        this.name="Dame",
        this.place=place
    }
};
class King {
    constructor(color,place) {
        this.color = color,
        this.name="Roi",
        this.place=place
    }
};
// "A1" => [0,0];
const findCase = (caseString) => {
    let caseCoords = caseString.split('');
    let x = caseCoords[0].charCodeAt(0)-65;
    let y = Number(caseCoords[1])-1;
    return [x,y];
}
// [0,0] => "A1";
const convertCoords = (coords) => {
    let i=String.fromCharCode(coords[0]+65);
    let j=(coords[1]+1).toString();
    return i+j;
}
// changePosition("A1",2,5) => "C6"
const changePosition = (actualPos,i=0,j=0) => {
    let coords = findCase(actualPos);
    if (0<=coords[0]+i && coords[0]+i<8) {
        coords[0]+=i;
    } else {
        return undefined;
    }
    if (0<=coords[1]-j && coords[1]-j<8) {
        coords[1]-=j;
    } else {
        return undefined;
    }
    return convertCoords(coords);
}
// Prends en entrée la liste des cases possibles et y affiche des boules;
const displayBalls = (cases) => {
    for (let i=0;i<cases.length;i++) {
        document.querySelector(`#${cases[i]}`).innerHTML = ball;
    }
};
const newGame = new ChessGame();
// const myPawn = document.querySelector("#D2");
// myPawn.addEventListener("click",() => {
//     displayBalls(["#D3","#D4"]);
// })
let myPawn = new Pawn("black","D7");
myPawn.getHTML().addEventListener("click",myPawn.move());