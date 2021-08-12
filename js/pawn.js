export const ball = '<div class="ball"></div>';
// "#A1" => [0,0];
export function strToArr(caseString) {
    let caseCoords = delID(caseString).split('');
    let x = caseCoords[0].charCodeAt(0) - 65;
    let y = Number(caseCoords[1]) - 1;
    return [x, y];
};
// [0,0] => "#A1";
export function arrToStr(coords) {
    let i = String.fromCharCode(coords[0] + 65);
    let j = (coords[1] + 1).toString();
    return "#" + i + j;
};
export function getID(id) {
    return `#${id}`;
};
export function delID(id) {
    return id.slice(1, 3);
}

// Cases = liste d'objets jQuery des cases en question
export function displayBalls(cases) {
    cases[0].forEach(elt => {
        elt.html(ball);
    });
};
export function displayPiece(id, allPieces) {
    let myPiece=undefined;
    if (id == undefined) {
        return myPiece;
    };
    // Sélectionnes le pion actuel parmis la liste des pions pawns;
    for (let i = 0; i < allPieces.length; i++) {
        if (allPieces[i]._actualPos == id) {
            myPiece = allPieces[i];
        };
    };
    return myPiece;
};

// changePosition("#A1",2,5) => "#C6"
export function changePos(actualPos, i = 0, j = 0) {
    let coords = strToArr(actualPos);
    //Afin de s'assurer que la pièce ne sorte pas de l'échiquier
    if (0 <= coords[0] + i && coords[0] + i < 8) {
        coords[0] += i;
    } else { // Si la nouvelle position est en dehors de l'échiquier renvoyer undefined
        return undefined;
    };
    //Afin de s'assurer que la pièce ne sorte pas de l'échiquier
    if (0 <= coords[1] - j && coords[1] - j < 8) {
        coords[1] -= j;
    } else { // Si la nouvelle position est en dehors de l'échiquier renvoyer undefined
        return undefined;
    };
    return arrToStr(coords);
};
// Parité pour le mouvement des pions
export function parite(myPawn) {
    let s;
    if (myPawn._color == "black" && delID(myPawn._actualPos) != "0") {
        s = 1;
    } else if (myPawn._color == "white" && delID(myPawn._actualPos) != "0") {
        s = -1;
    } else {
        s = undefined;
    };
    return s;
};
// Renvoi les objets jQuery des positions possibles [[],[]] avec en premier les coups basique et en second les attaques;
export function getAllowedPos(myPawn) {
    const color = myPawn._color;
    const index = myPawn._count;
    const currID = myPawn._actualPos;
    const s = parite(myPawn);
    let positions = new Array();
    let upPos = $(changePos(myPawn._actualPos, 0, s * 1));
    let upUpPos = $(changePos(myPawn._actualPos, 0, s * 2));
    let firstAttack;
    let secondAttack;
    if (changePos(currID, 1, s * 1) != undefined) {
        firstAttack = $(changePos(currID, 1, s * 1));
    } else {
        firstAttack = undefined;
    };
    if (changePos(currID, -1, s * 1) != undefined) {
        secondAttack = $(changePos(currID, -1, s * 1));
    } else {
        secondAttack = undefined;
    };
    // Si la case upPos est livre :
    if (upPos.html() == "") {
        positions.push([upPos]);
        if (upUpPos.html() == "" && index == 0) {
            positions[0].push(upUpPos);
        };
    } else {
        positions.push([]);
    };
    // Si la pièce a manger est de la couleur opposée ET non vide :
    if (firstAttack != undefined && firstAttack.html() != "" && firstAttack.children().attr("alt")[0] != color) {
        positions.push([firstAttack]);
        if (secondAttack != undefined && secondAttack.html() != "" && secondAttack.children().attr("alt")[0] != color) {
            positions[1].push(secondAttack);
        };
    } else if (secondAttack != undefined && secondAttack.html() != "" && secondAttack.children().attr("alt")[0] != color && positions.length == 1) {
        positions.push([secondAttack]);
    } else {
        positions.push([]);
    };
    return positions;
};

export function removeBalls(chessBoard) {
    for (let i = 0; i < chessBoard.length; i++) {
        for (let j = 0; j < chessBoard[i].length; j++) {
            if ($(getID(chessBoard[i][j])).html() == ball) {
                $(getID(chessBoard[i][j])).html("");
            };
        };
    };
};

export function addEvents(color, blackPieces, whitePieces) {
    if (color == "black") {
        for (let k = 0; k < blackPieces.length; k++) {
            if (blackPieces[k]._actualPos != "0") {
                $(blackPieces[k]._actualPos).on("click", blackPieces[k].onClick);
            };
        };
    } else {
        for (let k = 0; k < whitePieces.length; k++) {
            if (whitePieces[k]._actualPos != "0") {
                $(whitePieces[k]._actualPos).on("click", whitePieces[k].onClick);
            };
        };
    };
};

export function removeEvents(color, blackPieces, whitePieces) {
    if (color == "black") {
        for (let k = 0; k < blackPieces.length; k++) {
            $(blackPieces[k]._actualPos).off("click", blackPieces[k].onClick);
        };
    } else {
        for (let k = 0; k < whitePieces.length; k++) {
            $(whitePieces[k]._actualPos).off("click", whitePieces[k].move);
        };
    };
};

export function otherPositions(chessBoard) {
    let pieces = [];
    for (let i = 0; i < chessBoard.length; i++) {
        for (let j = 0; j < chessBoard[0].length; j++) {
            if ($(getID(chessBoard[i][j])).html() == "") {
                pieces.push($(getID(chessBoard[i][j])).attr("id"));
            };
        };
    };
    return pieces;
};