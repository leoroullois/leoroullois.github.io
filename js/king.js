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
    if (coords[0] >= 0 && coords[0] < 8 && coords[1] >= 0 && coords[1] < 8) {
        let i = String.fromCharCode(coords[0] + 65);
        let j = (coords[1] + 1).toString();
        return "#" + i + j;
    } else {
        return undefined;
    }
};
export function getID(id) {
    return "#" + id;
};
export function delID(id) {
    return id.slice(1, 3);
}

// Cases = liste d'objets jQuery des cases en question
export function displayBalls(cases) {
    cases.forEach(elt => {
        if (elt.html()=="") {
            elt.html(ball);
        };
    });
};
export function displayPiece(id, allPieces) {
    let myPiece = undefined;
    if (id == undefined) {
        return myPiece;
    };
    // Sélectionnes la pièce actuelle parmis la liste des pièces;
    for (let i = 0; i < allPieces.length; i++) {
        if (allPieces[i]._actualPos == id) {
            myPiece = allPieces[i];
        };
    };
    return myPiece;
};

// Renvoi les objets jQuery des positions possibles [[],[]] avec en premier les coups basique et en second les attaques;
export function getAllowedPos(myKnight,allPieces) {
    const currID = myKnight._actualPos;
    const color = myKnight._color;
    let i = strToArr(currID)[0];
    let j = strToArr(currID)[1];
    let positions = []
    positions.push([i+1,j]);
    positions.push([i-1,j]);
    positions.push([i,j-1]);
    positions.push([i,j+1]);
    positions.push([i+1,j+1]);
    positions.push([i+1,j-1]);
    positions.push([i-1,j+1]);
    positions.push([i-1,j-1]);

    positions=positions.filter((elt)=> {
        return arrToStr(elt)!=undefined;
    });
    positions=positions.map((elt)=>arrToStr(elt));
    positions=positions.filter((elt)=> {
        // True si la case elt n'est pas vide
        const piece = displayPiece(elt,allPieces);
        // return true si la case elt est vide
        if (piece==undefined) {
            return true
        };
        if (piece!=undefined && piece._color!=color) {
            return true;
        };
        return false;
    });
    positions=positions.map((elt)=>$(elt));
    return positions;
};

// changePos("#A1",2,5) => "#C6"
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