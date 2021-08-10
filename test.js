// $("h1")[0].addEventListener("click", () => {
//     console.log("AAAA");
// },{once : true});
positions=["D4","D5"];
const pos = "D4";
let clicked = false;
$("h1")[0].addEventListener("click", () => {
    clicked = true;
    newPos = pos;
});

const move = () => {
    if (clicked) {
        console.log("Link clicked");
        console.log("Bouge en : ",pos);
    } else {
        setTimeout(move, 100);
    };
};
move();