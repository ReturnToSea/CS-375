/////////////////////////////////////////////////////////////////////////////
//  IndexedCube.js
//
//  An indexed cube defined with 8 vertices and 12 triangles
//

class IndexedCube {
    constructor(gl, vertexShader, fragmentShader) {
        // Vertex shader
        vertexShader ||= `
            in vec4 aPosition;
            in vec4 aColor;

            uniform mat4 P;
            uniform mat4 MV;

            out vec4 vColor;

            void main() {
                vColor = aColor; // Pass color to fragment shader
                gl_Position = P * MV * aPosition;
            }
        `;

        // Fragment shader
        fragmentShader ||= `
            in vec4 vColor;
            out vec4 fColor;
            void main() {
                fColor = vColor; // Pass through color
            }
        `;

        const positions = new Float32Array([
            -0.5, -0.5,  0.5,  // Vertex 0
             0.5, -0.5,  0.5,  // Vertex 1
             0.5,  0.5,  0.5,  // Vertex 2
            -0.5,  0.5,  0.5,  // Vertex 3
            -0.5, -0.5, -0.5,  // Vertex 4
            -0.5,  0.5, -0.5,  // Vertex 5
             0.5,  0.5, -0.5,  // Vertex 6
             0.5, -0.5, -0.5   // Vertex 7
        ]);

        const colors = new Float32Array([
            1.0, 0.0, 0.0, 1.0, //Red
            0.0, 1.0, 0.0, 1.0, //Green
            0.0, 0.0, 1.0, 1.0, //Blue
            1.0, 1.0, 0.0, 1.0, //Yellow
            1.0, 0.5, 0.0, 1.0, //Orange
            0.5, 0.0, 0.5, 1.0, //Purple
            0.0, 1.0, 1.0, 1.0, //Cyan
            1.0, 0.0, 1.0, 1.0  //Magenta
        ]);

        const indices = new Uint16Array([
            0, 1, 2, 0, 2, 3, // Front face
            4, 5, 6, 4, 6, 7, // Back face
            0, 1, 7, 0, 7, 4, // Bottom face
            3, 2, 6, 3, 6, 5, // Top face
            1, 2, 6, 1, 6, 7, // Right face
            0, 3, 5, 0, 5, 4  // Left face
        ]);

        const program = new ShaderProgram(gl, this, vertexShader, fragmentShader);

        const aPosition = new Attribute(gl, program, "aPosition", positions, 3, gl.FLOAT);
        const aColor = new Attribute(gl, program, "aColor", colors, 4, gl.FLOAT);

        const indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

        this.draw = () => {
            program.use();

            aPosition.enable();
            aColor.enable();

            gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

            aColor.disable();
            aPosition.disable();
        };
    }
}
