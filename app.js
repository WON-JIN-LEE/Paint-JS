const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".jsColor");
const range = document.querySelector("#jsRange");
const mode = document.querySelector("#jsMode");
const saveBtn = document.querySelector("#jsSave");

//constant 상수
const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

//reset on Load
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;


function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;

    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function onMouseDown(event) {
    painting = true;
}

//fill와 stroke style color 변경
function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

//lineWidth handle Range 
function handleRangeChange(event) {
    const Width = event.target.value;
    ctx.lineWidth = Width;
}

//Fill모드와 PAINT모드 handle
function handleModeClick() {
    if (filling === true) {
        filling = false;
        mode.innerText = "Fill"
    } else {
        filling = true;
        mode.innerText = "PAINT";
        ctx.fillStyle = ctx.strokeStyle;
    }
}

//canvas 색으로 채우기
function handleCanvasClick() {
    if (filling) { ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);}
}

//마우스 오른쪽 클릭시 컨텍스트 메뉴 비활성화
function handleCM(event) {
    event.preventDefault(); 
}

//save버튼 클릭시 canvas image 다운로드
function handleSaveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[🍖]";
    link.click();
}

if (canvas) {
    //마우스 포인트 이벤트
    canvas.addEventListener("mousemove", onMouseMove); 
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);

    //canvas 클릭 이벤트
    canvas.addEventListener("click", handleCanvasClick);

    // 컨텍스트 메뉴
    canvas.addEventListener("contextmenu", handleCM);
}

//color 클릭 이벤트
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

//lineWidth handle 
if (range) {
    range.addEventListener("input", handleRangeChange);
}

//Fill 버튼 클릭 이벤트
if (mode) {
    mode.addEventListener("click", handleModeClick);
}

//save버튼 클릭 이벤트
if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}