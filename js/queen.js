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
    for (let k=0;k<cases.length;k++) {
        cases[k].forEach((elt) => {
            if (elt.html()=="") {
                elt.html(ball);
            };
        });
    }
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
export function getAllowedPos(myQueen,allPieces) {
    const pos1= getAllowedPos1(myQueen,allPieces);
    const pos2 = getAllowedPos2(myQueen,allPieces);
    let positions = pos1.concat(pos2);
    return positions;
}
export function getAllowedPos1(myBishop,allPieces) {
    const currID = myBishop._actualPos;
    const color = myBishop._color;
    let i = strToArr(currID)[0];
    let j = strToArr(currID)[1];
    let diag1=[];
    let diag2=[];
    let diag3=[];
    let diag4=[];
    for (let k = 0; k < 8; k++) {
        diag1.push([i-k,j+k]);
        diag2.push([i+k,j+k]);
        diag3.push([i+k,j-k]);
        diag4.push([i-k,j-k]);
    };
    diag1=diag1.filter((elt)=> {
        return arrToStr(elt)!=undefined;
    });
    diag2=diag2.filter((elt)=> {
        return arrToStr(elt)!=undefined;
    });
    diag3=diag3.filter((elt)=> {
        return arrToStr(elt)!=undefined;
    });
    diag4=diag4.filter((elt)=> {
        return arrToStr(elt)!=undefined;
    });
    diag1=diag1.map((elt)=>arrToStr(elt));
    diag2=diag2.map((elt)=>arrToStr(elt));
    diag3=diag3.map((elt)=>arrToStr(elt));
    diag4=diag4.map((elt)=>arrToStr(elt));
    let diag1Bis=[];
    let k=0;
    do {
        k++;
        if (displayPiece(diag1[k],allPieces)!=undefined) {
            if (displayPiece(diag1[k],allPieces)._color!=color) {
                diag1Bis.push($(diag1[k]));
            };
        } else {
            diag1Bis.push($(diag1[k]));
        };
    } while (k<diag1.length && displayPiece(diag1[k],allPieces)==undefined);
    let diag2Bis=[];
    k=0;
    do {
        k++;
        if (displayPiece(diag2[k],allPieces)!=undefined) {
            if (displayPiece(diag2[k],allPieces)._color!=color) {
                diag2Bis.push($(diag2[k]));
            };
        } else {
            diag2Bis.push($(diag2[k]));
        };
    } while (k<diag2.length && displayPiece(diag2[k],allPieces)==undefined);
    let diag3Bis=[];
    k=0;
    do {
        k++;
        if (displayPiece(diag3[k],allPieces)!=undefined) {
            if (displayPiece(diag3[k],allPieces)._color!=color) {
                diag3Bis.push($(diag3[k]));
            };
        } else {
            diag3Bis.push($(diag3[k]));
        };
    } while (k<diag3.length && displayPiece(diag3[k],allPieces)==undefined);
    let diag4Bis=[];
    k=0;
    do {
        k++;
        if (displayPiece(diag4[k],allPieces)!=undefined) {
            if (displayPiece(diag4[k],allPieces)._color!=color) {
                diag4Bis.push($(diag4[k]));
            };
        } else {
            diag4Bis.push($(diag4[k]));
        };
    } while (k<diag4.length && displayPiece(diag4[k],allPieces)==undefined);
    let positions = [diag1Bis,diag2Bis,diag3Bis,diag4Bis];
    return positions;
};
export function getAllowedPos2(myBishop,allPieces) {
    const currID = myBishop._actualPos;
    const color = myBishop._color;
    let i = strToArr(currID)[0];
    let j = strToArr(currID)[1];
    let row1=[];
    let row2=[];
    let row3=[];
    let row4=[];
    for (let k = 0; k < 8; k++) {
        row1.push([i,j+k]);
        row2.push([i,j-k]);
        row3.push([i+k,j]);
        row4.push([i-k,j]);
    };
    row1=row1.filter((elt)=> {
        return arrToStr(elt)!=undefined;
    });
    row2=row2.filter((elt)=> {
        return arrToStr(elt)!=undefined;
    });
    row3=row3.filter((elt)=> {
        return arrToStr(elt)!=undefined;
    });
    row4=row4.filter((elt)=> {
        return arrToStr(elt)!=undefined;
    });
    row1=row1.map((elt)=>arrToStr(elt));
    row2=row2.map((elt)=>arrToStr(elt));
    row3=row3.map((elt)=>arrToStr(elt));
    row4=row4.map((elt)=>arrToStr(elt));
    let row1Bis=[];
    let k=0;
    do {
        k++;
        if (displayPiece(row1[k],allPieces)!=undefined) {
            if (displayPiece(row1[k],allPieces)._color!=color) {
                row1Bis.push($(row1[k]));
            };
        } else {
            row1Bis.push($(row1[k]));
        };
    } while (k<row1.length && displayPiece(row1[k],allPieces)==undefined);
    let row2Bis=[];
    k=0;
    do {
        k++;
        if (displayPiece(row2[k],allPieces)!=undefined) {
            if (displayPiece(row2[k],allPieces)._color!=color) {
                row2Bis.push($(row2[k]));
            };
        } else {
            row2Bis.push($(row2[k]));
        };
    } while (k<row2.length && displayPiece(row2[k],allPieces)==undefined);
    let row3Bis=[];
    k=0;
    do {
        k++;
        if (displayPiece(row3[k],allPieces)!=undefined) {
            if (displayPiece(row3[k],allPieces)._color!=color) {
                row3Bis.push($(row3[k]));
            };
        } else {
            row3Bis.push($(row3[k]));
        };
    } while (k<row3.length && displayPiece(row3[k],allPieces)==undefined);
    let row4Bis=[];
    k=0;
    do {
        k++;
        if (displayPiece(row4[k],allPieces)!=undefined) {
            if (displayPiece(row4[k],allPieces)._color!=color) {
                row4Bis.push($(row4[k]));
            };
        } else {
            row4Bis.push($(row4[k]));
        };
    } while (k<row4.length && displayPiece(row4[k],allPieces)==undefined);
    let positions = [row1Bis,row2Bis,row3Bis,row4Bis];
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