import * as bishop from "./js/bishop.js";
import * as rook from "./js/rook.js";
import * as queen from "./js/queen.js";
import * as knight from "./js/knight.js";
import * as pawn from "./js/pawn.js";
const chessBoard = [
    ["A1", "B1", "C1", "D1", "E1", "F1", "G1", "H1"],
    ["A2", "B2", "C2", "D2", "E2", "F2", "G2", "H2"],
    ["A3", "B3", "C3", "D3", "E3", "F3", "G3", "H3"],
    ["A4", "B4", "C4", "D4", "E4", "F4", "G4", "H4"],
    ["A5", "B5", "C5", "D5", "E5", "F5", "G5", "H5"],
    ["A6", "B6", "C6", "D6", "E6", "F6", "G6", "H6"],
    ["A7", "B7", "C7", "D7", "E7", "F7", "G7", "H7"],
    ["A8", "B8", "C8", "D8", "E8", "F8", "G8", "H8"],
];

const newGameFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
class ChessGame {
    constructor(fen = newGameFen) {
        let splitedFen = fen.split(" ");
        this._position = splitedFen[0];
        this._color = splitedFen[1];
        this._castle = splitedFen[2];
        this._enPassant = splitedFen[3];
        this._halfMove = splitedFen[4];
        this._fullMove = splitedFen[5];
    }
    getFen() {
        return this._position + " " + this._color + " " + this._castle + " " + this._enPassant + " " + this._halfMove + " " + this._fullMove;
    }
};

let x = [1];

class Knight {
    constructor(color, actualPos) {
        this._color = color,
            this._name = "Knight",
            this._actualPos = actualPos
    }
    getHTML() {
        if (this._actualPos == "0") {
            return undefined;
        } else {
            return $(this._actualPos).html();
        };
    }
    onClick(e) {
        console.log("Début onClick(e) : ", knight.displayPiece("#" + e.currentTarget.id, allPieces));
        for (let i = 0; i < x.length; i++) {
            clearTimeout(x[i]);
        };
        // Supprime tous les évents de toutes les cases
        for (let i = 0; i < chessBoard.length; i++) {
            for (let j = 0; j < chessBoard[i].length; j++) {
                $(knight.getID(chessBoard[i][j])).off();
            };
        };

        knight.removeBalls(chessBoard);
        const myPiece = knight.displayPiece(knight.getID(e.currentTarget.id), allPieces);
        console.table(myPiece);

        
        const positions = knight.getAllowedPos(myPiece, allPieces)
        // const allowedPos = [positions];

        let clicked = false;
        let newPos;
        let positionClick = [];

        const otherPieces = knight.otherPositions(chessBoard);
        let otherPiecesClick = [];
        let otherPiecesClicked = false;

        console.log("positions : ", positions);
        console.log("otherPieces :", otherPieces);
        
        knight.removeEvents(myPiece._color, blackPieces, whitePieces);
        knight.addEvents(myPiece._color, blackPieces, whitePieces);

        // Déploie les boules
        knight.displayBalls(positions);

        // Ajoute tous les événéments liés à la fonction positionClick dans une liste pour pouvir mieux les supprimer par la suite
        for (let k = 0; k < positions.length; k++) {
            positionClick.push(() => {
                newPos = positions[k];
                clicked = true;
                console.log("New position clicked :", newPos.attr("id"), clicked);
                for (let i = 0; i < positions.length; i++) {
                    positions[i].off("click", positionClick[i]);
                };
                for (let i = 0; i < otherPieces.length; i++) {
                    $(knight.getID(otherPieces[i])).off('click', otherPiecesClick[i]);
                };
            });
        };
        // Ajoute tous les événéments liés à la fonction otherPiecesClick dans une liste pour pouvir mieux les supprimer par la suite
        for (let k = 0; k < otherPieces.length; k++) {
            otherPiecesClick.push(() => {
                otherPiecesClicked = true;
                console.log("clear balls :", otherPiecesClicked);
                knight.removeBalls(chessBoard);
                $(myPiece._actualPos).on("click", myPiece.onClick);
                for (let i = 0; i < otherPieces.length; i++) {
                    $(knight.getID(otherPieces[i])).off('click', otherPiecesClick[i]);
                };
                for (let i = 0; i < positions.length; i++) {
                    positions[i].off("click", positionClick[i]);
                };
            });
        };

        // Ajoute les événements liés à otherPiecesClick sur les cases vides
        for (let k = 0; k < otherPieces.length; k++) {
            $(knight.getID(otherPieces[k])).on('click', otherPiecesClick[k]);
        }
        // Ajoute les événements positionClick sur les nouvelles positions possibles
        for (let k = 0; k < positions.length; k++) {
            positions[k].on("click", positionClick[k]);
        };

        function move() {
            // console.log("ID :",id);
            // console.log("myPiece._actualPos :",myPiece._actualPos);
            if (clicked) {
                console.log("Valid position clicked ! Move to : ", newPos.attr("id"));
                if (knight.displayPiece("#" + newPos.attr("id"), allPieces) != undefined) {
                    knight.displayPiece("#" + newPos.attr("id"), allPieces)._actualPos = "0";
                    newPos.off();
                }
                $(newPos).html("");
                $(myPiece._actualPos).children().appendTo(newPos);
                // Clear tous les évents sur les pièces blanches
                // Mises à jours des données :
                $(myPiece._actualPos).off("click", myPiece.onClick);
                myPiece._actualPos = "#" + newPos.attr("id");
                myPiece._count++;
                if (myPiece._color == "white") {
                    $("h2>span").html("noirs");
                    newGame._color = "b";

                    knight.removeEvents("white", blackPieces, whitePieces);
                    knight.addEvents("black", blackPieces, whitePieces);
                } else {
                    $("h2>span").html("blancs");
                    newGame._color = "w";
                    newGame._fullMove++;

                    knight.removeEvents("black", blackPieces, whitePieces);
                    knight.addEvents("white", blackPieces, whitePieces);
                };


                // Conclusions :
                knight.removeBalls(chessBoard);
                console.log("Piece updated :")
                console.table(myPiece);
                console.log("FEN updated :", newGame.getFen());
                clicked = false;
            } else if (otherPiecesClicked) {
                otherPiecesClicked = false;
            } else {
                console.log("Waiting for : ", myPiece._actualPos);
                let y = setTimeout(move, 100);
                x.push(y);
            };
        };
        move();
        clearTimeout(x);
        console.log("Fin onClick(e) : ", knight.displayPiece("#" + e.currentTarget.id, allPieces))
    }
};
class Rook {
    constructor(color, actualPos) {
        this._color = color,
            this._name = "Tour",
            this._actualPos = actualPos
    };
    getHTML() {
        if (this._actualPos == "0") {
            return undefined;
        } else {
            return $(this._actualPos).html();
        };
    }
    onClick(e) {
        console.log("Début onClick(e) : ", rook.displayPiece("#" + e.currentTarget.id, allPieces));
        for (let i = 0; i < x.length; i++) {
            clearTimeout(x[i]);
        };
        // Supprime tous les évents de toutes les cases
        for (let i = 0; i < chessBoard.length; i++) {
            for (let j = 0; j < chessBoard[i].length; j++) {
                $(pawn.getID(chessBoard[i][j])).off();
            };
        };

        rook.removeBalls(chessBoard);
        const myPiece = rook.displayPiece(rook.getID(e.currentTarget.id), allPieces);
        console.table(myPiece);


        const allowedPos = rook.getAllowedPos(myPiece, allPieces);
        const positions = allowedPos[0].concat(allowedPos[1]).concat(allowedPos[2]).concat(allowedPos[3]);

        let clicked = false;
        let newPos;
        let positionClick = [];

        const otherPieces = pawn.otherPositions(chessBoard);
        let otherPiecesClick = [];
        let otherPiecesClicked = false;

        console.log("positions : ", positions);
        console.log("otherPieces :", otherPieces);
        
        rook.removeEvents(myPiece._color, blackPieces, whitePieces);
        rook.addEvents(myPiece._color, blackPieces, whitePieces);

        // Déploie les boules
        rook.displayBalls(allowedPos);

        // Ajoute tous les événéments liés à la fonction positionClick dans une liste pour pouvir mieux les supprimer par la suite
        for (let k = 0; k < positions.length; k++) {
            positionClick.push(() => {
                newPos = positions[k];
                clicked = true;
                console.log("New position clicked :", newPos.attr("id"), clicked);
                for (let i = 0; i < positions.length; i++) {
                    positions[i].off("click", positionClick[i]);
                };
                for (let i = 0; i < otherPieces.length; i++) {
                    $(rook.getID(otherPieces[i])).off('click', otherPiecesClick[i]);
                };
            });
        };
        // Ajoute tous les événéments liés à la fonction otherPiecesClick dans une liste pour pouvir mieux les supprimer par la suite
        for (let k = 0; k < otherPieces.length; k++) {
            otherPiecesClick.push(() => {
                otherPiecesClicked = true;
                console.log("clear balls :", otherPiecesClicked);
                rook.removeBalls(chessBoard);
                $(myPiece._actualPos).on("click", myPiece.onClick);
                for (let i = 0; i < otherPieces.length; i++) {
                    $(rook.getID(otherPieces[i])).off('click', otherPiecesClick[i]);
                };
                for (let i = 0; i < positions.length; i++) {
                    positions[i].off("click", positionClick[i]);
                };
            });
        };

        // Ajoute les événements liés à otherPiecesClick sur les cases vides
        for (let k = 0; k < otherPieces.length; k++) {
            $(rook.getID(otherPieces[k])).on('click', otherPiecesClick[k]);
        }
        // Ajoute les événements positionClick sur les nouvelles positions possibles
        for (let k = 0; k < positions.length; k++) {
            positions[k].on("click", positionClick[k]);
        };

        function move() {
            // console.log("ID :",id);
            // console.log("myPiece._actualPos :",myPiece._actualPos);
            if (clicked) {
                console.log("Valid position clicked ! Move to : ", newPos.attr("id"));
                if (rook.displayPiece("#" + newPos.attr("id"), allPieces) != undefined) {
                    rook.displayPiece("#" + newPos.attr("id"), allPieces)._actualPos = "0";
                    newPos.off();
                }
                $(newPos).html("");
                $(myPiece._actualPos).children().appendTo(newPos);
                // Clear tous les évents sur les pièces blanches
                // Mises à jours des données :
                $(myPiece._actualPos).off("click", myPiece.onClick);
                myPiece._actualPos = "#" + newPos.attr("id");
                myPiece._count++;
                if (myPiece._color == "white") {
                    $("h2>span").html("noirs");
                    newGame._color = "b";

                    rook.removeEvents("white", blackPieces, whitePieces);
                    rook.addEvents("black", blackPieces, whitePieces);
                } else {
                    $("h2>span").html("blancs");
                    newGame._color = "w";
                    newGame._fullMove++;

                    rook.removeEvents("black", blackPieces, whitePieces);
                    rook.addEvents("white", blackPieces, whitePieces);
                };


                // Conclusions :
                rook.removeBalls(chessBoard);
                console.log("Piece updated :")
                console.table(myPiece);
                console.log("FEN updated :", newGame.getFen());
                clicked = false;
            } else if (otherPiecesClicked) {
                otherPiecesClicked = false;
            } else {
                console.log("Waiting for : ", myPiece._actualPos);
                let y = setTimeout(move, 100);
                x.push(y);
            };
        };
        move();
        clearTimeout(x);
        console.log("Fin onClick(e) : ", rook.displayPiece("#" + e.currentTarget.id, allPieces))
    }
};
class Queen {
    constructor(color, actualPos) {
        this._color = color,
            this._name = "Dame",
            this._actualPos = actualPos
    };
    getHTML() {
        if (this._actualPos == "0") {
            return undefined;
        } else {
            return $(`#${this._actualPos}`);
        };
    };
    onClick(e) {
        console.log("Début onClick(e) : ", queen.displayPiece("#" + e.currentTarget.id, allPieces));
        for (let i = 0; i < x.length; i++) {
            clearTimeout(x[i]);
        };
        // Supprime tous les évents de toutes les cases
        for (let i = 0; i < chessBoard.length; i++) {
            for (let j = 0; j < chessBoard[i].length; j++) {
                $(pawn.getID(chessBoard[i][j])).off();
            };
        };

        queen.removeBalls(chessBoard);
        const myPiece = queen.displayPiece(queen.getID(e.currentTarget.id), allPieces);
        console.table(myPiece);


        const allowedPos = queen.getAllowedPos(myPiece, allPieces);
        console.log("allowedPos : ",allowedPos);
        const positions = allowedPos[0].concat(allowedPos[1]).concat(allowedPos[2]).concat(allowedPos[3]).concat(allowedPos[4]).concat(allowedPos[5]).concat(allowedPos[6]).concat(allowedPos[7]);

        let clicked = false;
        let newPos;
        let positionClick = [];

        const otherPieces = pawn.otherPositions(chessBoard);
        let otherPiecesClick = [];
        let otherPiecesClicked = false;

        console.log("positions : ", positions);
        console.log("otherPieces :", otherPieces);
        
        queen.removeEvents(myPiece._color, blackPieces, whitePieces);
        queen.addEvents(myPiece._color, blackPieces, whitePieces);

        // Déploie les boules
        queen.displayBalls(allowedPos);

        // Ajoute tous les événéments liés à la fonction positionClick dans une liste pour pouvir mieux les supprimer par la suite
        for (let k = 0; k < positions.length; k++) {
            positionClick.push(() => {
                newPos = positions[k];
                clicked = true;
                console.log("New position clicked :", newPos.attr("id"), clicked);
                for (let i = 0; i < positions.length; i++) {
                    positions[i].off("click", positionClick[i]);
                };
                for (let i = 0; i < otherPieces.length; i++) {
                    $(queen.getID(otherPieces[i])).off('click', otherPiecesClick[i]);
                };
            });
        };
        // Ajoute tous les événéments liés à la fonction otherPiecesClick dans une liste pour pouvir mieux les supprimer par la suite
        for (let k = 0; k < otherPieces.length; k++) {
            otherPiecesClick.push(() => {
                otherPiecesClicked = true;
                console.log("clear balls :", otherPiecesClicked);
                queen.removeBalls(chessBoard);
                $(myPiece._actualPos).on("click", myPiece.onClick);
                for (let i = 0; i < otherPieces.length; i++) {
                    $(queen.getID(otherPieces[i])).off('click', otherPiecesClick[i]);
                };
                for (let i = 0; i < positions.length; i++) {
                    positions[i].off("click", positionClick[i]);
                };
            });
        };

        // Ajoute les événements liés à otherPiecesClick sur les cases vides
        for (let k = 0; k < otherPieces.length; k++) {
            $(queen.getID(otherPieces[k])).on('click', otherPiecesClick[k]);
        }
        // Ajoute les événements positionClick sur les nouvelles positions possibles
        for (let k = 0; k < positions.length; k++) {
            positions[k].on("click", positionClick[k]);
        };

        function move() {
            // console.log("ID :",id);
            // console.log("myPiece._actualPos :",myPiece._actualPos);
            if (clicked) {
                console.log("Valid position clicked ! Move to : ", newPos.attr("id"));
                if (queen.displayPiece("#" + newPos.attr("id"), allPieces) != undefined) {
                    queen.displayPiece("#" + newPos.attr("id"), allPieces)._actualPos = "0";
                    newPos.off();
                }
                $(newPos).html("");
                $(myPiece._actualPos).children().appendTo(newPos);
                // Clear tous les évents sur les pièces blanches
                // Mises à jours des données :
                $(myPiece._actualPos).off("click", myPiece.onClick);
                myPiece._actualPos = "#" + newPos.attr("id");
                myPiece._count++;
                if (myPiece._color == "white") {
                    $("h2>span").html("noirs");
                    newGame._color = "b";

                    queen.removeEvents("white", blackPieces, whitePieces);
                    queen.addEvents("black", blackPieces, whitePieces);
                } else {
                    $("h2>span").html("blancs");
                    newGame._color = "w";
                    newGame._fullMove++;

                    queen.removeEvents("black", blackPieces, whitePieces);
                    queen.addEvents("white", blackPieces, whitePieces);
                };


                // Conclusions :
                queen.removeBalls(chessBoard);
                console.log("Piece updated :")
                console.table(myPiece);
                console.log("FEN updated :", newGame.getFen());
                clicked = false;
            } else if (otherPiecesClicked) {
                otherPiecesClicked = false;
            } else {
                console.log("Waiting for : ", myPiece._actualPos);
                let y = setTimeout(move, 100);
                x.push(y);
            };
        };
        move();
        clearTimeout(x);
        console.log("Fin onClick(e) : ", queen.displayPiece("#" + e.currentTarget.id, allPieces))
    }
};
class King {
    constructor(color, actualPos) {
        this._color = color,
            this._name = "King",
            this._actualPos = actualPos
    }
    getHTML() {
        if (this._actualPos == "0") {
            return undefined;
        } else {
            return $(this._actualPos).html();
        };
    }
    onClick(e) {
        console.log("Début onClick(e) : ", king.displayPiece("#" + e.currentTarget.id, allPieces));
        for (let i = 0; i < x.length; i++) {
            clearTimeout(x[i]);
        };
        // Supprime tous les évents de toutes les cases
        for (let i = 0; i < chessBoard.length; i++) {
            for (let j = 0; j < chessBoard[i].length; j++) {
                $(king.getID(chessBoard[i][j])).off();
            };
        };

        king.removeBalls(chessBoard);
        const myPiece = king.displayPiece(king.getID(e.currentTarget.id), allPieces);
        console.table(myPiece);

        
        const positions = king.getAllowedPos(myPiece, allPieces)
        // const allowedPos = [positions];

        let clicked = false;
        let newPos;
        let positionClick = [];

        const otherPieces = king.otherPositions(chessBoard);
        let otherPiecesClick = [];
        let otherPiecesClicked = false;

        console.log("positions : ", positions);
        console.log("otherPieces :", otherPieces);
        
        king.removeEvents(myPiece._color, blackPieces, whitePieces);
        king.addEvents(myPiece._color, blackPieces, whitePieces);

        // Déploie les boules
        king.displayBalls(positions);

        // Ajoute tous les événéments liés à la fonction positionClick dans une liste pour pouvir mieux les supprimer par la suite
        for (let k = 0; k < positions.length; k++) {
            positionClick.push(() => {
                newPos = positions[k];
                clicked = true;
                console.log("New position clicked :", newPos.attr("id"), clicked);
                for (let i = 0; i < positions.length; i++) {
                    positions[i].off("click", positionClick[i]);
                };
                for (let i = 0; i < otherPieces.length; i++) {
                    $(king.getID(otherPieces[i])).off('click', otherPiecesClick[i]);
                };
            });
        };
        // Ajoute tous les événéments liés à la fonction otherPiecesClick dans une liste pour pouvir mieux les supprimer par la suite
        for (let k = 0; k < otherPieces.length; k++) {
            otherPiecesClick.push(() => {
                otherPiecesClicked = true;
                console.log("clear balls :", otherPiecesClicked);
                king.removeBalls(chessBoard);
                $(myPiece._actualPos).on("click", myPiece.onClick);
                for (let i = 0; i < otherPieces.length; i++) {
                    $(king.getID(otherPieces[i])).off('click', otherPiecesClick[i]);
                };
                for (let i = 0; i < positions.length; i++) {
                    positions[i].off("click", positionClick[i]);
                };
            });
        };

        // Ajoute les événements liés à otherPiecesClick sur les cases vides
        for (let k = 0; k < otherPieces.length; k++) {
            $(king.getID(otherPieces[k])).on('click', otherPiecesClick[k]);
        }
        // Ajoute les événements positionClick sur les nouvelles positions possibles
        for (let k = 0; k < positions.length; k++) {
            positions[k].on("click", positionClick[k]);
        };

        function move() {
            // console.log("ID :",id);
            // console.log("myPiece._actualPos :",myPiece._actualPos);
            if (clicked) {
                console.log("Valid position clicked ! Move to : ", newPos.attr("id"));
                if (king.displayPiece("#" + newPos.attr("id"), allPieces) != undefined) {
                    king.displayPiece("#" + newPos.attr("id"), allPieces)._actualPos = "0";
                    newPos.off();
                }
                $(newPos).html("");
                $(myPiece._actualPos).children().appendTo(newPos);
                // Clear tous les évents sur les pièces blanches
                // Mises à jours des données :
                $(myPiece._actualPos).off("click", myPiece.onClick);
                myPiece._actualPos = "#" + newPos.attr("id");
                myPiece._count++;
                if (myPiece._color == "white") {
                    $("h2>span").html("noirs");
                    newGame._color = "b";

                    king.removeEvents("white", blackPieces, whitePieces);
                    king.addEvents("black", blackPieces, whitePieces);
                } else {
                    $("h2>span").html("blancs");
                    newGame._color = "w";
                    newGame._fullMove++;

                    king.removeEvents("black", blackPieces, whitePieces);
                    king.addEvents("white", blackPieces, whitePieces);
                };


                // Conclusions :
                king.removeBalls(chessBoard);
                console.log("Piece updated :")
                console.table(myPiece);
                console.log("FEN updated :", newGame.getFen());
                clicked = false;
            } else if (otherPiecesClicked) {
                otherPiecesClicked = false;
            } else {
                console.log("Waiting for : ", myPiece._actualPos);
                let y = setTimeout(move, 100);
                x.push(y);
            };
        };
        move();
        clearTimeout(x);
        console.log("Fin onClick(e) : ", king.displayPiece("#" + e.currentTarget.id, allPieces))
    }
};
class Bishop {
    constructor(color, actualPos) {
        this._color = color,
            this._name = "Bishop",
            this._actualPos = actualPos
    }
    getHTML() {
        if (this._actualPos == "0") {
            return undefined;
        } else {
            return $(this._actualPos).html();
        };
    }
    onClick(e) {
        console.log("Début onClick(e) : ", bishop.displayPiece("#" + e.currentTarget.id, allPieces));
        for (let i = 0; i < x.length; i++) {
            clearTimeout(x[i]);
        };
        // Supprime tous les évents de toutes les cases
        for (let i = 0; i < chessBoard.length; i++) {
            for (let j = 0; j < chessBoard[i].length; j++) {
                $(pawn.getID(chessBoard[i][j])).off();
            };
        };

        bishop.removeBalls(chessBoard);
        const myPiece = bishop.displayPiece(bishop.getID(e.currentTarget.id), allPieces);
        console.table(myPiece);


        const allowedPos = bishop.getAllowedPos(myPiece, allPieces);
        console.log("allowedPos : ",allowedPos);
        const positions = allowedPos[0].concat(allowedPos[1]).concat(allowedPos[2]).concat(allowedPos[3]);

        let clicked = false;
        let newPos;
        let positionClick = [];

        const otherPieces = pawn.otherPositions(chessBoard);
        let otherPiecesClick = [];
        let otherPiecesClicked = false;

        console.log("positions : ", positions);
        console.log("otherPieces :", otherPieces);
        
        bishop.removeEvents(myPiece._color, blackPieces, whitePieces);
        bishop.addEvents(myPiece._color, blackPieces, whitePieces);

        // Déploie les boules
        bishop.displayBalls(allowedPos);

        // Ajoute tous les événéments liés à la fonction positionClick dans une liste pour pouvir mieux les supprimer par la suite
        for (let k = 0; k < positions.length; k++) {
            positionClick.push(() => {
                newPos = positions[k];
                clicked = true;
                console.log("New position clicked :", newPos.attr("id"), clicked);
                for (let i = 0; i < positions.length; i++) {
                    positions[i].off("click", positionClick[i]);
                };
                for (let i = 0; i < otherPieces.length; i++) {
                    $(bishop.getID(otherPieces[i])).off('click', otherPiecesClick[i]);
                };
            });
        };
        // Ajoute tous les événéments liés à la fonction otherPiecesClick dans une liste pour pouvir mieux les supprimer par la suite
        for (let k = 0; k < otherPieces.length; k++) {
            otherPiecesClick.push(() => {
                otherPiecesClicked = true;
                console.log("clear balls :", otherPiecesClicked);
                bishop.removeBalls(chessBoard);
                $(myPiece._actualPos).on("click", myPiece.onClick);
                for (let i = 0; i < otherPieces.length; i++) {
                    $(bishop.getID(otherPieces[i])).off('click', otherPiecesClick[i]);
                };
                for (let i = 0; i < positions.length; i++) {
                    positions[i].off("click", positionClick[i]);
                };
            });
        };

        // Ajoute les événements liés à otherPiecesClick sur les cases vides
        for (let k = 0; k < otherPieces.length; k++) {
            $(bishop.getID(otherPieces[k])).on('click', otherPiecesClick[k]);
        }
        // Ajoute les événements positionClick sur les nouvelles positions possibles
        for (let k = 0; k < positions.length; k++) {
            positions[k].on("click", positionClick[k]);
        };

        function move() {
            // console.log("ID :",id);
            // console.log("myPiece._actualPos :",myPiece._actualPos);
            if (clicked) {
                console.log("Valid position clicked ! Move to : ", newPos.attr("id"));
                if (bishop.displayPiece("#" + newPos.attr("id"), allPieces) != undefined) {
                    bishop.displayPiece("#" + newPos.attr("id"), allPieces)._actualPos = "0";
                    newPos.off();
                }
                $(newPos).html("");
                $(myPiece._actualPos).children().appendTo(newPos);
                // Clear tous les évents sur les pièces blanches
                // Mises à jours des données :
                $(myPiece._actualPos).off("click", myPiece.onClick);
                myPiece._actualPos = "#" + newPos.attr("id");
                myPiece._count++;
                if (myPiece._color == "white") {
                    $("h2>span").html("noirs");
                    newGame._color = "b";

                    bishop.removeEvents("white", blackPieces, whitePieces);
                    bishop.addEvents("black", blackPieces, whitePieces);
                } else {
                    $("h2>span").html("blancs");
                    newGame._color = "w";
                    newGame._fullMove++;

                    bishop.removeEvents("black", blackPieces, whitePieces);
                    bishop.addEvents("white", blackPieces, whitePieces);
                };


                // Conclusions :
                bishop.removeBalls(chessBoard);
                console.log("Piece updated :")
                console.table(myPiece);
                console.log("FEN updated :", newGame.getFen());
                clicked = false;
            } else if (otherPiecesClicked) {
                otherPiecesClicked = false;
            } else {
                console.log("Waiting for : ", myPiece._actualPos);
                let y = setTimeout(move, 100);
                x.push(y);
            };
        };
        move();
        clearTimeout(x);
        console.log("Fin onClick(e) : ", bishop.displayPiece("#" + e.currentTarget.id, allPieces))
    }
};

class Pawn {
    constructor(color, actualPos, count = 0) {
        this._color = color,
            this._name = "Pawn",
            this._actualPos = actualPos,
            this._count = count,
            this._promoted = false
    }
    getHTML() {
        if (this._actualPos == "0") {
            return undefined;
        } else {
            return $(this._actualPos).html();
        };
    }
    onClick(e) {
        console.log("Début onClick(e) : ", pawn.displayPiece("#" + e.currentTarget.id, allPieces))
        for (let i = 0; i < x.length; i++) {
            clearTimeout(x[i]);
        };
        // Supprime tous les évents de toutes les cases
        for (let i = 0; i < chessBoard.length; i++) {
            for (let j = 0; j < chessBoard[i].length; j++) {
                $(pawn.getID(chessBoard[i][j])).off();
            };
        };
        pawn.removeBalls(chessBoard);
        const myPiece = pawn.displayPiece(pawn.getID(e.currentTarget.id), allPieces);
        console.table(myPiece);

        // Récup tous les coups possibles [["A1","A2"],["B3"]] avec les endroits vides et les endroits à attaquer
        const allowedPos = pawn.getAllowedPos(myPiece);
        const positions = allowedPos[0].concat(allowedPos[1]);

        let clicked = false;
        let newPos;
        let positionClick = [];

        const otherPieces = pawn.otherPositions(chessBoard);
        let otherPiecesClick = [];
        let otherPiecesClicked = false;

        console.log("positions : ", positions);
        console.log("otherPieces :", otherPieces);

        pawn.removeEvents(myPiece._color, blackPieces, whitePieces);
        pawn.addEvents(myPiece._color, blackPieces, whitePieces);

        // Déploie les boules
        pawn.displayBalls(allowedPos);

        // Ajoute tous les événéments liés à la fonction positionClick dans une liste pour pouvir mieux les supprimer par la suite
        for (let k = 0; k < positions.length; k++) {
            positionClick.push(() => {
                newPos = positions[k];
                clicked = true;
                console.log("New position clicked :", newPos.attr("id"), clicked);
                for (let i = 0; i < positions.length; i++) {
                    positions[i].off("click", positionClick[i]);
                };
                for (let i = 0; i < otherPieces.length; i++) {
                    $(pawn.getID(otherPieces[i])).off('click', otherPiecesClick[i]);
                };
            });
        };
        // Ajoute tous les événéments liés à la fonction otherPiecesClick dans une liste pour pouvir mieux les supprimer par la suite
        for (let k = 0; k < otherPieces.length; k++) {
            otherPiecesClick.push(() => {
                otherPiecesClicked = true;
                console.log("clear balls :", otherPiecesClicked);
                pawn.removeBalls(chessBoard);
                $(myPiece._actualPos).on("click", myPiece.onClick);
                for (let i = 0; i < otherPieces.length; i++) {
                    $(pawn.getID(otherPieces[i])).off('click', otherPiecesClick[i]);
                };
                for (let i = 0; i < positions.length; i++) {
                    positions[i].off("click", positionClick[i]);
                };
            });
        };

        // Ajoute les événements liés à otherPiecesClick sur les cases vides
        for (let k = 0; k < otherPieces.length; k++) {
            $(pawn.getID(otherPieces[k])).on('click', otherPiecesClick[k]);
        }
        // Ajoute les événements positionClick sur les nouvelles positions possibles
        for (let k = 0; k < positions.length; k++) {
            positions[k].on("click", positionClick[k]);
        };

        // Fonction qui attends le click sur une case afin de bouger la pièce si la case est valide
        function move() {
            // console.log("ID :",id);
            // console.log("myPiece._actualPos :",myPiece._actualPos);
            if (clicked) {
                console.log("Valid position clicked ! Move to : ", newPos.attr("id"));
                if (pawn.displayPiece("#" + newPos.attr("id"), allPieces) != undefined) {
                    pawn.displayPiece("#" + newPos.attr("id"), allPieces)._actualPos = "0";
                    newPos.off();
                }
                $(newPos).html("");
                $(myPiece._actualPos).children().appendTo(newPos);
                // Clear tous les évents sur les pièces blanches
                // Mises à jours des données :
                $(myPiece._actualPos).off("click", myPiece.onClick);
                myPiece._actualPos = "#" + newPos.attr("id");
                myPiece._count++;
                if (myPiece._actualPos[2] == 8 && myPiece._color == "white") {
                    myPiece._promoted = true;
                    $(myPiece._actualPos).html('<img src="//images.chesscomfiles.com/chess-themes/pieces/neo/150/wq.png" alt="white queen">')
                    myPiece._name = "Queen";
                } else if (myPiece._actualPos[2] == 1 && myPiece._color == "black") {
                    myPiece._promoted = true;
                    $(myPiece._actualPos).html('<img src="//images.chesscomfiles.com/chess-themes/pieces/neo/150/bq.png" alt="black queen">')
                    myPiece._name = "Queen";
                };
                if (myPiece._color == "white") {
                    $("h2>span").html("noirs");
                    newGame._color = "b";

                    pawn.removeEvents("white", blackPieces, whitePieces);
                    pawn.addEvents("black", blackPieces, whitePieces);
                } else {
                    $("h2>span").html("blancs");
                    newGame._color = "w";
                    newGame._fullMove++;

                    pawn.removeEvents("black", blackPieces, whitePieces);
                    pawn.addEvents("white", blackPieces, whitePieces);
                };


                // Conclusions :
                pawn.removeBalls(chessBoard);
                console.log("Piece updated :")
                console.table(myPiece);
                console.log("FEN updated :", newGame.getFen());
                clicked = false;
            } else if (otherPiecesClicked) {
                otherPiecesClicked = false;
            } else {
                console.log("Waiting for : ", myPiece._actualPos);
                let y = setTimeout(move, 100);
                x.push(y);
            };
        };
        move();
        clearTimeout(x);
        console.log("Fin onClick(e) : ", pawn.displayPiece("#" + e.currentTarget.id, allPieces));
    }
};

const newGame = new ChessGame();
let pa = new Pawn("black", "#A7");
let pb = new Pawn("black", "#B7");
let pc = new Pawn("black", "#C7");
let pd = new Pawn("black", "#D7");
let pe = new Pawn("black", "#E7");
let pf = new Pawn("black", "#F7");
let pg = new Pawn("black", "#G7");
let ph = new Pawn("black", "#H7");
let ra = new Rook("black", "#A8");
let rh = new Rook("black", "#H8");
let kb = new Knight("black", "#B8");
let kg = new Knight("black", "#G8");
let bc = new Bishop("black", "#C8");
let bf = new Bishop("black", "#F8");
let kd = new King("black", "#D8");
let qe = new Queen("black", "#E8");

let Pa = new Pawn("white", "#A2");
let Pb = new Pawn("white", "#B2");
let Pc = new Pawn("white", "#C2");
let Pd = new Pawn("white", "#D2");
let Pe = new Pawn("white", "#E2");
let Pf = new Pawn("white", "#F2");
let Pg = new Pawn("white", "#G2");
let Ph = new Pawn("white", "#H2");
let Ra = new Rook("white", "#A1");
let Rh = new Rook("white", "#H1");
let Kb = new Knight("white", "#B1");
let Kg = new Knight("white", "#G1");
let Bc = new Bishop("white", "#C1");
let Bf = new Bishop("white", "#F1");
let Kd = new King("white", "#D1");
let Qe = new Queen("white", "#E1");

const blackPieces = [ra, rh, kb, kg, bc, bf, kd, qe, pa, pb, pc, pd, pe, pf, pg, ph];
const whitePieces = [Ra, Rh, Kb, Kg, Bc, Bf, Kd, Qe, Pa, Pb, Pc, Pd, Pe, Pf, Pg, Ph];
const pawns = [pa, pb, pc, pd, pe, pf, pg, ph, Pa, Pb, Pc, Pd, Pe, Pf, Pg, Ph];
const allPieces = blackPieces.concat(whitePieces);
$(Pa._actualPos).on('click', Pa.onClick);
$(Pb._actualPos).on('click', Pb.onClick);
$(Pc._actualPos).on('click', Pc.onClick);
$(Pd._actualPos).on('click', Pd.onClick);
$(Pe._actualPos).on('click', Pe.onClick);
$(Pf._actualPos).on('click', Pf.onClick);
$(Pg._actualPos).on('click', Pg.onClick);
$(Ph._actualPos).on('click', Ph.onClick);
$(Kb._actualPos).on('click',Kb.onClick);
$(Kg._actualPos).on('click',Kg.onClick);