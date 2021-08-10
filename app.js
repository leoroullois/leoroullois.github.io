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
const ball = '<div class="ball" onclick="movePawn(this)"></div>';
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
};
class Knight {
    constructor(color,actualPos) {
        this.color = color,
        this.name="Cavalier",
        this._actualPos=actualPos
    }
    getHTML() {
        if (this._actualPos=="0") {
            return undefined;
        } else {
            return document.getElementById(this._actualPos);
        };
    }
};
class Bishop {
    constructor(color,actualPos) {
        this.color = color,
        this.name="Fou",
        this._actualPos=actualPos
    }
    getHTML() {
        if (this._actualPos=="0") {
            return undefined;
        } else {
            return document.getElementById(this._actualPos);
        };
    }
};
class Rook {
    constructor(color,actualPos) {
        this.color = color,
        this.name="Tour",
        this._actualPos=actualPos
    };
    getHTML() {
        if (this._actualPos=="0") {
            return undefined;
        } else {
            return document.getElementById(this._actualPos);
        };
    };
};
class Queen {
    constructor(color,actualPos) {
        this.color = color,
        this.name="Dame",
        this._actualPos=actualPos
    };
    getHTML() {
        if (this._actualPos=="0") {
            return undefined;
        } else {
            return document.getElementById(this._actualPos);
        };
    };
};
class King {
    constructor(color,actualPos) {
        this.color = color,
        this.name="Roi",
        this._actualPos=actualPos
    }
    getHTML() {
        if (this._actualPos=="0") {
            return undefined;
        } else {
            return document.getElementById(this._actualPos);
        }
    }
};
// Renvoie les coups possibles sous la forme ["D3","D4"];
const pawnPossiblePos = (myPawn,s) => {
    let positions = [];
    const id = myPawn._actualPos;
    let upPos = document.getElementById(changePosition(id,0,s*1));
    let upUpPos;
    if (myPawn==undefined) {
        upUpPos=undefined;
    } else if(myPawn._count==0) {
        upUpPos = document.getElementById(changePosition(id,0,s*2));
    } else {
        upUpPos=undefined;
    };
    if (!upPos.hasChildNodes()) {
        console.log(`Pion peut bouger en ${upPos.id}`);
        positions.push(upPos.id);
        if (upUpPos!=undefined && !upUpPos.hasChildNodes()) {
            console.log(`Pion peut bouger en ${upUpPos.id}`);
            positions.push(upUpPos.id);
        };
    };
    return positions;
};
// Renvoie les attaques possibles sous la forme ["D3","D4"];
const pawnPossibleAttacks = (myPawn,s) => {
    let attacks=[];
    const id = myPawn._actualPos;
    let firstAttack = document.getElementById(changePosition(id,1,s*1));
    let secondAttack = document.getElementById(changePosition(id,-1,s*1));
    if (firstAttack!=undefined && myPawn!=undefined) {
        // Vérifie si il y a bien une pièce sur la case d'attaque et si elle est de couleur différente
        if (firstAttack.innerHTML!="" && firstAttack.childNodes[0].alt.split(" ")[0]!=myPawn._color) {
            attacks.push(firstAttack.id);
        };
    };
    if (secondAttack!=undefined && myPawn!=undefined) {
        // Vérifie si il y a bien une pièce sur la case d'attaque et si elle est de couleur différente
        if (secondAttack.innerHTML!="" && secondAttack.childNodes[0].alt.split(" ")[0]!=myPawn._color) {
            attacks.push(secondAttack.id);
        };
    };
    return attacks;
};
let id;
let positions;
class Pawn {
    constructor(color,actualPos,count=0) {
        this._color = color,
        this._name="Pawn",
        this._actualPos=actualPos,
        this._count=count
    }
    getHTML() {
        if (this._actualPos=="0") {
            return undefined;
        } else {
            return document.getElementById(this._actualPos);
        }
    }
    move() {
        console.log("DEBUT MOVE() :\n");
        id= this.id;
        const myPawn = displayPiece(id);
        const s = parite(myPawn);
        // Coups possibles sous la forme ["D3","D4"];
        positions = pawnPossiblePos(myPawn,s);
        // Attaques possibles sous la forme ["D3","D4"];
        const attacks = pawnPossibleAttacks(myPawn,s);
        //let attackedPawns;
        // if (attacks!=[]) {
        //     attackedPawns=attacks.map((elt) => displayPiece(elt));
        //     console.log(attackedPawns);
        //     // Retire les événements des pions attaquables
        //     for (let i=0;i<attackedPawns.length;i++) {
        //         if (attackedPawns[i]!=undefined) {
        //             attackedPawns[i].getHTML().removeEventListener("click",attackedPawns[i].move);
        //         };
        //     };
        // };
        // Affiche les boules pour indiquer les coups possibles;
        displayBalls(positions);

        // // Ajoute les événements pour déplacer la pièce;
        // for (let i=0;i<positions.length;i++) {
        //     let moveEvent = ()=> {
        //         console.log("BEGIN moveEvent");
        //         document.getElementById(id).innerHTML="";
        //         if(myPawn._color == "black") {
        //             document.getElementById(positions[i]).innerHTML='<img src="//images.chesscomfiles.com/chess-themes/pieces/neo/150/bp.png" alt="black pawn">';
        //         } else {
        //             document.getElementById(positions[i]).innerHTML='<img src="//images.chesscomfiles.com/chess-themes/pieces/neo/150/wp.png" alt="white pawn">';
        //         };
        //         // Mise à jours des propriétés du pion
        //         myPawn._actualPos = positions[i];
        //         myPawn._count += 1;
        //         // Permet de supprimer la deuxième boule lors du premier coup d'un pion
        //         if(i==0 && positions.length==2) {
        //             document.getElementById(positions[1]).innerHTML="";
        //         } else if (i==1) {
        //             document.getElementById(positions[0]).innerHTML="";
        //         };
        //         // Rajoute un event pour le pion une fois déplacé
        //         myPawn.getHTML().addEventListener("click",myPawn.move);
        //         console.log("END moveEvent");
        //     };
        //     document.getElementById(positions[i]).addEventListener("click",moveEvent);
        // };
        // Ajoute les events pour les pièces attaquables
        // for (let i=0;i<attacks.length;i++) {
        //     const attackEvent = () => {
        //         document.getElementById(id).innerHTML="";
        //         if(myPawn._color == "black") {
        //             document.getElementById(attacks[i]).innerHTML='<img src="//images.chesscomfiles.com/chess-themes/pieces/neo/150/bp.png" alt="black pawn">';
        //         } else {
        //             document.getElementById(attacks[i]).innerHTML='<img src="//images.chesscomfiles.com/chess-themes/pieces/neo/150/wp.png" alt="white pawn">';
        //         };
        //         // Mise à jours des propriétés du pion
        //         myPawn._actualPos = attacks[i];
        //         myPawn._count += 1;
        //         console.log("ATTACKED PAWN :",attackedPawn);
        //         console.log("ATTACKED PAWN HTML :",attackedPawn.getHTML());
        //         attackedPawn.getHTML().removeEventListener("click",attackEvent);
        //         attackedPawn.getHTML().removeEventListener("click",attackedPawn.move);
        //         attackedPawn._actualPos="0";
        //         myPawn.getHTML().addEventListener("click",myPawn.move);
        //         console.log("ATTACKER :",myPawn);
        //     };
        //     document.getElementById(attacks[i]).addEventListener("click",attackEvent);

        // };
        // let allBalls = ballList();
        // console.log(allBalls);
        // for (let i=0;i<allBalls.length;i++) {
        //     console.log("CLEAR BALLS");
        //     allBalls[i].getHTML().innerHTML = "";
        // };
        console.log("FIN MOVE.");
    };
};
const movePawn = (outgoing) => {
    const myPawn = displayPiece(id);
    const ballID = outgoing.parentNode.id;
    document.getElementById(id).innerHTML="";
    if(myPawn._color == "black") {
        document.getElementById(ballID).innerHTML='<img src="//images.chesscomfiles.com/chess-themes/pieces/neo/150/bp.png" alt="black pawn">';
    } else {
        document.getElementById(ballID).innerHTML='<img src="//images.chesscomfiles.com/chess-themes/pieces/neo/150/wp.png" alt="white pawn">';
    };
    document.getElementById(myPawn._actualPos).removeEventListener("click",myPawn.move);
    myPawn._actualPos=ballID;
    myPawn._count+=1;
    document.getElementById(myPawn._actualPos).addEventListener("click",myPawn.move);
    for (let i=0;i<chessBoard.length;i++) {
        for (let j=0;j<chessBoard[i].length;j++) {
            if (document.getElementById(chessBoard[i][j]).innerHTML==ball) {
                document.getElementById(chessBoard[i][j]).innerHTML="";
                console.log("AAAAA");
            };
        };
    };
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
};
// changePosition("A1",2,5) => "C6"
const changePosition = (actualPos,i=0,j=0) => {
    let coords = findCase(actualPos);
    if (0<=coords[0]+i && coords[0]+i<8) {
        coords[0]+=i;
    } else {
        return undefined;
    };
    if (0<=coords[1]-j && coords[1]-j<8) {
        coords[1]-=j;
    } else {
        return undefined;
    };
    return convertCoords(coords);
};
// Prends en entrée la liste des cases possibles et y affiche des boules;
const displayBalls = (cases) => {
    for (let i=0;i<cases.length;i++) {
        document.querySelector(`#${cases[i]}`).innerHTML = ball;
    };
};
// Renvoi l'objet correspondant à la pièce sur une case id
const displayPiece = (id) => {
    let myPiece;
    if(id==undefined) {
        return undefined;
    }
    // Sélectionnes le pion actuel parmis la liste des pions pawns;
    for (let i=0;i<allPieces.length;i++) {
        if (allPieces[i]._actualPos ==id) {
            myPiece=allPieces[i];
        };
    };
    return myPiece;
}
// Parité pour le mouvement des pions
const parite = (myPawn) => {
    let s;
    if (myPawn==undefined) {
        s=0;
    } else if (myPawn._color=="black") {
        s=1;
    } else {
        s=-1;
    };
    return s;
}
const ballList = () => {
    let result = [];
    for (let i=0;i<chessBoard.length;i++) {
        for (let j=0; j<chessBoard[i].length;j++) {
            if (document.getElementById(chessBoard[i][j]==ball)) {
                result.push(displayPiece(chessBoard[i][j]));
            }
        }
    };
    return result;
};
// Supprime les événements des boules situées dans positions
const delEvent = (positions) => {
    for (let i=0; i<positions.length;i++) {
        console.log("AAAAAA",displayPiece(positions[i]))
        document.getElementById(positions[i]).removeEventListener("click",displayPiece(positions[i]).move);
    };
};

const newGame = new ChessGame();
if (newGame._color=="w") {
    newGame._color = "white";
} else if (newGame =="b") {
    newGame = "black";
};
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
const ra = new Rook("black","A8");
const rh = new Rook("black","H8");
const kb = new Knight("black","B8");
const kg = new Knight("black","G8");
const bc = new Bishop("black","C8");
const bf = new Bishop("black","F8");
const kd = new King("black","D8");
const qe = new Queen("black","E8");

const Pa = new Pawn("white","A2");
const Pb = new Pawn("white","B2");
const Pc = new Pawn("white","C2");
const Pd = new Pawn("white","D2");
const Pe = new Pawn("white","E2");
const Pf = new Pawn("white","F2");
const Pg = new Pawn("white","G2");
const Ph = new Pawn("white","H2");
const Ra = new Rook("white","A1");
const Rh = new Rook("white","H1");
const Kb = new Knight("white","B1");
const Kg = new Knight("white","G1");
const Bc = new Bishop("white","C1");
const Bf = new Bishop("white","F1");
const Kd = new King("white","D1");
const Qe = new Queen("white","E1");
const blackPieces = [ra,rh,kb,kg,bc,bf,kd,qe,pa,pb,pc,pd,pe,pf,pg,ph];
const whitePieces = [Ra,Rh,Kb,Kg,Bc,Bf,Kd,Qe,Pa,Pb,Pc,Pd,Pe,Pf,Pg,Ph];
const pawns = [pa,pb,pc,pd,pe,pf,pg,ph,Pa,Pb,Pc,Pd,Pe,Pf,Pg,Ph];
const allPieces = blackPieces.concat(whitePieces);
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