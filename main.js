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
    const ball = '<div class="ball"></div>';
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
    class Knight {
        constructor(color, actualPos) {
            this.color = color,
                this.name = "Cavalier",
                this._actualPos = actualPos
        }
        getHTML() {
            if (this._actualPos == "0") {
                return undefined;
            } else {
                return $(`#${this._actualPos}`);
            };
        }
    };
    class Bishop {
        constructor(color, actualPos) {
            this.color = color,
                this.name = "Fou",
                this._actualPos = actualPos
        }
        getHTML() {
            if (this._actualPos == "0") {
                return undefined;
            } else {
                return $(`#${this._actualPos}`);
            };
        }
    };
    class Rook {
        constructor(color, actualPos) {
            this.color = color,
                this.name = "Tour",
                this._actualPos = actualPos
        };
        getHTML() {
            if (this._actualPos == "0") {
                return undefined;
            } else {
                return $(`#${this._actualPos}`);
            };
        };
    };
    class Queen {
        constructor(color, actualPos) {
            this.color = color,
                this.name = "Dame",
                this._actualPos = actualPos
        };
        getHTML() {
            if (this._actualPos == "0") {
                return undefined;
            } else {
                return $(`#${this._actualPos}`);
            };
        };
    };
    class King {
        constructor(color, actualPos) {
            this.color = color,
                this.name = "Roi",
                this._actualPos = actualPos
        }
        getHTML() {
            if (this._actualPos == "0") {
                return undefined;
            } else {
                return $(`#${this._actualPos}`);
            }
        }
    };
    let id;
    let positions;
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
                return document.getElementById(this._actualPos);
            }
        }
        move() {
            console.log("DEBUT MOVE() :");
            positions = [];
            id = this.id;
            const myPawn = displayPiece(id);
            const s = parite(myPawn);
            removeBalls();
            console.log("myPawn",myPawn);
            if (myPawn._color.slice(0, 1) == newGame._color) {
                console.log("C'est à vous de jouer!");
                // Coups possibles sous la forme ["D3","D4"];
                positions = pawnPossiblePos(myPawn, s);
                // Attaques possibles sous la forme ["D3","D4"];
                const attacks = pawnPossibleAttacks(myPawn, s);
                // Affiche les boules pour indiquer les coups possibles;
                displayBalls(positions);
                positions = positions.concat(attacks);
                let newPos = "";
                let clicked = false;
                // Ajoute les événements pour chaque nouvelles positions possibles
                for (let k = 0; k < positions.length; k++) {
                    $(getID(positions[k]))[0].addEventListener("click", () => {
                        newPos = positions[k];
                        clicked = true;
                    }, {
                        once: true
                    });
                };
                // Fonction qui attends le clic sur l'une des cases possibles;
                const movePawn = () => {
                    if (clicked) {
                        const myPawnID = getID(myPawn._actualPos);
                        const ballID = getID(newPos);
                        if ($(ballID).html() != ball) {
                            const piece = displayPiece(newPos);
                            if (piece._color == "black") {
                                blackPieces.splice(blackPieces.indexOf(piece), 1);
                            } else {
                                whitePieces.splice(whitePieces.indexOf(piece), 1);
                            };
                            $(ballID).html("");
                            piece._actualPos = "0";
                        };
                        $(myPawnID).html("");
                        if (myPawn._color == "black") {
                            $(ballID).html('<img src="//images.chesscomfiles.com/chess-themes/pieces/neo/150/bp.png" alt="black pawn">');
                        } else {
                            $(ballID).html('<img src="//images.chesscomfiles.com/chess-themes/pieces/neo/150/wp.png" alt="white pawn">');
                        };
                        $(myPawnID)[0].removeEventListener("click", myPawn.move);
                        myPawn._actualPos = newPos;
                        myPawn._count += 1;
                        const newPawnID = getID(myPawn._actualPos);
                        console.log(newPawnID);
                        $(newPawnID)[0].addEventListener("click", myPawn.move, {
                            once: true
                        });
                        removeBalls();
                        // Promotion en dame pour les blancs
                        if (newGame._color == "w") {
                            if (myPawn._actualPos.slice(1, 2) === "8") {
                                myPawn._promoted = true;
                                $(getID(myPawn._actualPos)).html('<img src="//images.chesscomfiles.com/chess-themes/pieces/neo/150/wq.png" alt="white queen">')
                                myPawn._name = "Queen";
                            };
                            newGame._color = "b";
                            $("#color").html("noirs");
                        } else { // Promotion en dame pour les noirs
                            if (myPawn._actualPos.slice(1, 2) === "1") {
                                myPawn._promoted = true;
                                $(getID(myPawn._actualPos)).html('<img src="//images.chesscomfiles.com/chess-themes/pieces/neo/150/bq.png" alt="black queen">')
                                myPawn._name = "Queen";
                            };
                            newGame._color = "w";
                            $("#color").html("blancs");
                        };
                        removeEvents(myPawn._color);
                        if (myPawn._color == "white") {
                            console.log("ajoute les events noirs", blackPieces);
                            addEvents("black");
                        } else {
                            console.log("ajoute les events blancs", whitePieces);
                            addEvents("white");
                        }
                    } else {
                        setTimeout(movePawn, 100);
                    };
                    clicked = false;
                };
                movePawn()
            } else {
                console.log(`C'est aux ${newGame._color} de jouer!`);
                $(getID(myPawn._actualPos))[0].addEventListener("click", myPawn.move, {
                    once: true
                })
            };
            //const newPos = await movePawn($("#D4"));

            console.log("FIN MOVE.");
        };
    };
    // "A1" => [0,0];
    const findCase = (caseString) => {
        let caseCoords = caseString.split('');
        let x = caseCoords[0].charCodeAt(0) - 65;
        let y = Number(caseCoords[1]) - 1;
        return [x, y];
    }
    // [0,0] => "A1";
    const convertCoords = (coords) => {
        let i = String.fromCharCode(coords[0] + 65);
        let j = (coords[1] + 1).toString();
        return i + j;
    };
    // changePosition("A1",2,5) => "C6"
    const changePosition = (actualPos, i = 0, j = 0) => {
        let coords = findCase(actualPos);
        if (0 <= coords[0] + i && coords[0] + i < 8) {
            coords[0] += i;
        } else {
            return undefined;
        };
        if (0 <= coords[1] - j && coords[1] - j < 8) {
            coords[1] -= j;
        } else {
            return undefined;
        };
        return convertCoords(coords);
    };
    // Parité pour le mouvement des pions
    const parite = (myPawn) => {
        let s;
        if (myPawn == undefined) {
            s = 0;
        } else if (myPawn._color == "black") {
            s = 1;
        } else {
            s = -1;
        };
        return s;
    };
    // Renvoi l'objet correspondant à la pièce sur une case id
    const displayPiece = (id) => {
        let myPiece;
        if (id == undefined) {
            return undefined;
        }
        // Sélectionnes le pion actuel parmis la liste des pions pawns;
        for (let i = 0; i < allPieces.length; i++) {
            if (allPieces[i]._actualPos == id) {
                myPiece = allPieces[i];
            };
        };
        return myPiece;
    };
    // Renvoie les coups possibles sous la forme ["D3","D4"];
    const pawnPossiblePos = (myPawn, s) => {
        let positions = [];
        const id = myPawn._actualPos;
        let upPos = $(getID(changePosition(id, 0, s * 1)));
        let upUpPos;
        if (myPawn == undefined) {
            upUpPos = undefined;
        } else if (myPawn._count == 0 && $(getID(changePosition(id, 0, s * 2))).html() === "") {
            upUpPos = $(getID(changePosition(id, 0, s * 2)));
        } else {
            upUpPos = undefined;
        };
        if (!upPos[0].hasChildNodes()) {
            console.log(`Pion peut bouger en ${upPos.attr("id")}`);
            positions.push(upPos.attr("id"));
            if (upUpPos != undefined) {
                console.log(`Pion peut bouger en ${upUpPos.attr("id")}`);
                positions.push(upUpPos.attr("id"));
            };
        };
        return positions;
    };
    // Renvoie les attaques possibles sous la forme ["D3","D4"];
    const pawnPossibleAttacks = (myPawn, s) => {
        let attacks = [];
        const id = myPawn._actualPos;
        let firstAttack = document.getElementById(changePosition(id, 1, s * 1));
        let secondAttack = document.getElementById(changePosition(id, -1, s * 1));
        if (firstAttack != undefined && myPawn != undefined) {
            // Vérifie si il y a bien une pièce sur la case d'attaque et si elle est de couleur différente
            if (firstAttack.innerHTML != "" && firstAttack.childNodes[0].alt.split(" ")[0] != myPawn._color) {
                attacks.push(firstAttack.id);
            };
        };
        if (secondAttack != undefined && myPawn != undefined) {
            // Vérifie si il y a bien une pièce sur la case d'attaque et si elle est de couleur différente
            if (secondAttack.innerHTML != "" && secondAttack.childNodes[0].alt.split(" ")[0] != myPawn._color) {
                attacks.push(secondAttack.id);
            };
        };
        return attacks;
    };
    // Prends en entrée la liste des cases possibles et y affiche des boules;
    const displayBalls = (cases) => {
        for (let i = 0; i < cases.length; i++) {
            $(`#${cases[i]}`).html(ball);
        };
    };

    const ballList = () => {
        let result = [];
        for (let i = 0; i < chessBoard.length; i++) {
            for (let j = 0; j < chessBoard[i].length; j++) {
                if (document.getElementById(chessBoard[i][j] == ball)) {
                    result.push(displayPiece(chessBoard[i][j]));
                }
            }
        };
        return result;
    };
    const removeBalls = () => {
        for (let i = 0; i < chessBoard.length; i++) {
            for (let j = 0; j < chessBoard[i].length; j++) {
                if ($(getID(chessBoard[i][j])).html() == ball) {
                    $(getID(chessBoard[i][j])).html("");
                };
            };
        };
    };
    const removeEvents = (color) => {
        if (color == "black") {
            for (let k = 0; k < blackPieces.length; k++) {
                $(getID(blackPieces[k]._actualPos))[0].removeEventListener("click", blackPieces[k].move);
            };
        } else {
            for (let k = 0; k < whitePieces.length; k++) {
                $(getID(whitePieces[k]._actualPos))[0].removeEventListener("click", whitePieces[k].move);
            };
        };
    };
    const addEvents = (color) => {
        if (color == "black") {
            for (let k = 0; k < blackPieces.length; k++) {
                if (blackPieces[k]._actualPos != "0") {
                    $(getID(blackPieces[k]._actualPos))[0].addEventListener("click", blackPieces[k].move, {
                        once: true
                    });
                };
            };
        } else {
            for (let k = 0; k < whitePieces.length; k++) {
                if (whitePieces[k]._actualPos != "0") {
                    $(getID(whitePieces[k]._actualPos))[0].addEventListener("click", whitePieces[k].move, {
                        once: true
                    });
                };
            };
        };
    };
    // Supprime les événements des boules situées dans positions
    const delEvent = (positions) => {
        for (let i = 0; i < positions.length; i++) {
            console.log("AAAAAA", displayPiece(positions[i]))
            document.getElementById(positions[i]).removeEventListener("click", displayPiece(positions[i]).move);
        };
    };

    const getID = (id) => {
        return `#${id}`;
    };
    const newGame = new ChessGame();

    let pa = new Pawn("black", "A7");
    let pb = new Pawn("black", "B7");
    let pc = new Pawn("black", "C7");
    let pd = new Pawn("black", "D7");
    let pe = new Pawn("black", "E7");
    let pf = new Pawn("black", "F7");
    let pg = new Pawn("black", "G7");
    let ph = new Pawn("black", "H7");
    let ra = new Rook("black", "A8");
    let rh = new Rook("black", "H8");
    let kb = new Knight("black", "B8");
    let kg = new Knight("black", "G8");
    let bc = new Bishop("black", "C8");
    let bf = new Bishop("black", "F8");
    let kd = new King("black", "D8");
    let qe = new Queen("black", "E8");

    let Pa = new Pawn("white", "A2");
    let Pb = new Pawn("white", "B2");
    let Pc = new Pawn("white", "C2");
    let Pd = new Pawn("white", "D2");
    let Pe = new Pawn("white", "E2");
    let Pf = new Pawn("white", "F2");
    let Pg = new Pawn("white", "G2");
    let Ph = new Pawn("white", "H2");
    let Ra = new Rook("white", "A1");
    let Rh = new Rook("white", "H1");
    let Kb = new Knight("white", "B1");
    let Kg = new Knight("white", "G1");
    let Bc = new Bishop("white", "C1");
    let Bf = new Bishop("white", "F1");
    let Kd = new King("white", "D1");
    let Qe = new Queen("white", "E1");

    const blackPieces = [ra, rh, kb, kg, bc, bf, kd, qe, pa, pb, pc, pd, pe, pf, pg, ph];
    const whitePieces = [Ra, Rh, Kb, Kg, Bc, Bf, Kd, Qe, Pa, Pb, Pc, Pd, Pe, Pf, Pg, Ph];
    const pawns = [pa, pb, pc, pd, pe, pf, pg, ph, Pa, Pb, Pc, Pd, Pe, Pf, Pg, Ph];
    const allPieces = blackPieces.concat(whitePieces);
    // pa.getHTML().addEventListener("click", pa.move, {
    //     once: true
    // });
    // pb.getHTML().addEventListener("click", pb.move, {
    //     once: true
    // });
    // pc.getHTML().addEventListener("click", pc.move, {
    //     once: true
    // });
    // pd.getHTML().addEventListener("click", pd.move, {
    //     once: true
    // });
    // pe.getHTML().addEventListener("click", pe.move, {
    //     once: true
    // });
    // pf.getHTML().addEventListener("click", pf.move, {
    //     once: true
    // });
    // pg.getHTML().addEventListener("click", pg.move, {
    //     once: true
    // });
    // ph.getHTML().addEventListener("click", ph.move, {
    //     once: true
    // });

    Pa.getHTML().addEventListener("click", Pa.move, {
        once: true
    });
    Pb.getHTML().addEventListener("click", Pb.move, {
        once: true
    });
    Pc.getHTML().addEventListener("click", Pc.move, {
        once: true
    });
    Pd.getHTML().addEventListener("click", Pd.move, {
        once: true
    });
    Pe.getHTML().addEventListener("click", Pe.move, {
        once: true
    });
    Pf.getHTML().addEventListener("click", Pf.move, {
        once: true
    });
    Pg.getHTML().addEventListener("click", Pg.move, {
        once: true
    });
    Ph.getHTML().addEventListener("click", Ph.move, {
        once: true
    });