
let gl = undefined;

function init() {
    let canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");
    if (!gl) { alert("Your Web browser doesn't support WebGL 2\nPlease contact Dave"); }

    // Add initialization code here
    gl.clearColor(0.8, 0.9, 1.0, 1.0); //Set background color
    gl.enable(gl.DEPTH_TEST);

    cone = new Cone();
    sphere = new Sphere();
    tetrahedron = new Tetrahedron();

    render();
}

let ms = new MatrixStack();
let cone, axes, tetrahedron;
function render() {
    // Add rendering code here
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    ms.loadIdentity();

    ms.push();
    ms.translate(-0.5, 0.0, -1.0);
    ms.scale(0.2, 0.2, 0.2);
    ms.rotate(Math.PI / 4, 0.0, 1.0, 0.0);
    cone.draw(ms);
    ms.pop();

    ms.push();
    ms.translate(0.5, 0.0, -1.0);
    ms.rotate(Math.PI / 4, 0.0, 1.0, 0.0);
    axes.draw(ms);
    ms.pop();

    ms.push();
    ms.translate(0.0, 0.5, -1.0);
    ms.rotate(-Math.PI / 4, 1.0, 0.0, 0.0);
    tetrahedron.draw(ms);
    ms.pop();

    requestAnimationFrame(render);
}

window.onload = init;

