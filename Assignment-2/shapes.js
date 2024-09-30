
let gl = undefined;
let ms = new MatrixStack();
let cylinder, axes, tetrahedron;
let angle = 0.0;

function init() {
    let canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");
    if (!gl) { alert("Your Web browser doesn't support WebGL 2\nPlease contact Dave"); }

    // Add initialization code here
    gl.clearColor(0.8, 0.9, 1.0, 1.0); //Set background color
    gl.enable(gl.DEPTH_TEST);

    cone = new Cone(gl, 25);
    axes = new Axes(gl);
    tetrahedron = new Tetrahedron(gl);

    render();
}

function render() {
    // Add rendering code here
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    ms.loadIdentity();

    // ms.push();
    // ms.translate(-.5, 0.0, -1.0);
    // ms.scale(0.2);
    // //ms.rotate(Math.PI / 4, 0.0, 1.0, 0.0);
    // cone.MV = ms.current();
    // cone.draw(ms);
    // ms.pop();

    coneX = 0.8 * Math.cos(angle * Math.PI / 180);
    coneY = 0.4 * Math.sin(angle * Math.PI / 180);

    ms.push();
    ms.translate(coneX, coneY, 0.0);
    ms.rotate(angle, [0, 1, 1]);
    ms.scale(0.2);
    cone.MV = ms.current();
    //ms.color = vec4(0.3, 0.8, 0.8, 1.0);
    cone.draw();
    ms.pop();


    axesX = 0.7 * Math.cos((angle + 90) * Math.PI / 180);
    axesY = 0.5 * Math.sin((angle + 90) * Math.PI / 180);

    ms.push();
    ms.translate(axesX, axesY, 0.0);
    ms.rotate(angle, [.2, .3, .2]);
    ms.translate(0.0, 0.0, 0.2);
    ms.scale(0.5);
    axes.MV = ms.current();
    axes.draw();
    ms.pop();


    angle += 1.0;
    angle %= 360.0;

    tetX = 0.2 * Math.cos((angle + 180) * Math.PI / 180);
    tetY = 0.5 * Math.sin((angle + 180) * Math.PI / 180);


    ms.push();
    ms.translate(tetX, tetY, 0.0);
    ms.rotate(angle, [1, 1, 0]);
    ms.scale(0.2);
    //ms.color = vec4(0.3, 0.8, 0.8, 1.0);
    tetrahedron.MV = ms.current();
    tetrahedron.draw();
    ms.pop();



    requestAnimationFrame(render);
}

window.onload = init;

