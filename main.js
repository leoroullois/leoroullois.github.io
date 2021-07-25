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
    move() {
        const id= this.id;
        let myPawn;
        // Sélectionnes le pion acutle parmis la liste des pions pawns;
        for (let i=0;i<pawns.length;i++) {
            if (pawns[i]._actualPos ==id) {
                myPawn=pawns[i];
            }
        }
        let s;
        if (myPawn._color=="black") {
            s=1;
        } else {
            s=-1;
        }
        const upPos = document.querySelector(`#${changePosition(id,0,s*1)}`);
        const upUpPos = document.querySelector(`#${changePosition(id,0,s*2)}`);
        // Nouvelles positions possibles;
        let positions = [];
        if (!upPos.hasChildNodes()) {
            console.log(`Peut bouger en ${upPos.id}`);
            positions.push(upPos.id);
            if (!upUpPos.hasChildNodes()) {
                console.log(`Peut bouger en ${upUpPos.id}`);
                positions.push(upUpPos.id);
            }
        }
        // Affiche les boules pour indiquer les coups possibles;
        displayBalls(positions)
        // Ajoute les événements pour déplacer la pièce;
        for (let i=0;i<positions.length;i++) {
            document.querySelector(`#${positions[i]}`).addEventListener("click",()=> {
                document.querySelector(`#${id}`).innerHTML="";
                if(myPawn._color == "black") {
                    document.querySelector(`#${positions[i]}`).innerHTML='<img src="//images.chesscomfiles.com/chess-themes/pieces/neo/150/bp.png" alt="black pawn">';
                    myPawn._actualPos = positions[i];
                } else {
                    document.querySelector(`#${positions[i]}`).innerHTML='<img src="//images.chesscomfiles.com/chess-themes/pieces/neo/150/wp.png" alt="white pawn">';
                    myPawn._actualPos = positions[i];
                };
                if(i==0) {
                    console.log(document.querySelector(`#${positions[1]}`));
                    document.querySelector(`#${positions[1]}`).innerHTML="";
                } else if (i==1) {
                    document.querySelector(`#${positions[0]}`).innerHTML="";
                };
                myPawn.getHTML().addEventListener("click",myPawn.move);
            });
        }
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
const pa = new Pawn("black","A7");
const pb = new Pawn("black","B7");
const pc = new Pawn("black","C7");
const pd = new Pawn("black","D7");
const pe = new Pawn("black","E7");
const pf = new Pawn("black","F7");
const pg = new Pawn("black","G7");
const ph = new Pawn("black","H7");

const Pa = new Pawn("white","A2");
const Pb = new Pawn("white","B2");
const Pc = new Pawn("white","C2");
const Pd = new Pawn("white","D2");
const Pe = new Pawn("white","E2");
const Pf = new Pawn("white","F2");
const Pg = new Pawn("white","G2");
const Ph = new Pawn("white","H2");
const pawns = [pa,pb,pc,pd,pe,pf,pg,ph,Pa,Pb,Pc,Pd,Pe,Pf,Pg,Ph];

pa.getHTML().addEventListener("click",pa.move);
pb.getHTML().addEventListener("click",pb.move);
pc.getHTML().addEventListener("click",pc.move);
pd.getHTML().addEventListener("click",pd.move);
pe.getHTML().addEventListener("click",pe.move);
pf.getHTML().addEventListener("click",pf.move);
pg.getHTML().addEventListener("click",pg.move);
ph.getHTML().addEventListener("click",ph.move);

Pa.getHTML().addEventListener("click",Pa.move);
Pb.getHTML().addEventListener("click",Pb.move);
Pc.getHTML().addEventListener("click",Pc.move);
Pd.getHTML().addEventListener("click",Pd.move);
Pe.getHTML().addEventListener("click",Pe.move);
Pf.getHTML().addEventListener("click",Pf.move);
Pg.getHTML().addEventListener("click",Pg.move);
Ph.getHTML().addEventListener("click",Ph.move);