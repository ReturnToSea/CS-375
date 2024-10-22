/////////////////////////////////////////////////////////////////////////////
//
//  BasicCube.js
//
//  A cube defined of 12 triangles
//

class BasicCube {
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
            in  vec4 vColor;
            out vec4 fColor;
            void main() {
                const vec4 frontColor = vec4(1.0, 1.0, 1.0, 1.0);
                const vec4 backColor = vec4(1, 0.5, 0.5, 1.0);
                fColor = gl_FrontFacing ? frontColor : backColor; // Determine color based on face
            }
        `;

         let positions = new Float32Array([
            // Front face
            -0.5, -0.5,  0.5,  // Vertex 0
             0.5, -0.5,  0.5,  // Vertex 1
             0.5,  0.5,  0.5,  // Vertex 2
            -0.5,  0.5,  0.5,  // Vertex 3

            // Back face
            -0.5, -0.5, -0.5,  // Vertex 4
            -0.5,  0.5, -0.5,  // Vertex 5
             0.5,  0.5, -0.5,  // Vertex 6
             0.5, -0.5, -0.5,  // Vertex 7

            // Left face
            -0.5, -0.5, -0.5,  // Vertex 4
            -0.5,  0.5, -0.5,  // Vertex 5
            -0.5,  0.5,  0.5,  // Vertex 3
            -0.5, -0.5,  0.5,  // Vertex 0

            // Right face
             0.5, -0.5, -0.5,  // Vertex 7
             0.5,  0.5, -0.5,  // Vertex 6
             0.5,  0.5,  0.5,  // Vertex 2
             0.5, -0.5,  0.5,  // Vertex 1

            // Top face
            -0.5,  0.5, -0.5,  // Vertex 5
             0.5,  0.5, -0.5,  // Vertex 6
             0.5,  0.5,  0.5,  // Vertex 2
            -0.5,  0.5,  0.5,  // Vertex 3

            // Bottom face
            -0.5, -0.5, -0.5,  // Vertex 4
            -0.5, -0.5,  0.5,  // Vertex 0
             0.5, -0.5,  0.5,  // Vertex 1
             0.5, -0.5, -0.5,  // Vertex 7
        ]);

        let colors = new Float32Array([
            1.0, 0.0, 0.0, // Red
            0.0, 1.0, 0.0, // Green
            0.0, 0.0, 1.0, // Blue
            1.0, 1.0, 0.0, // Yellow
            1.0, 0.5, 0.0, // Orange
            0.5, 0.0, 0.5, // Purple
            0.0, 1.0, 1.0, // Cyan
            1.0, 0.0, 1.0  // Magenta
        ]);

        const indices = new Uint16Array([
            0, 1, 2, 0, 2, 3,
            4, 5, 6, 4, 6, 7,
            8, 9, 10, 8, 10, 11,
            12, 13, 14, 12, 14, 15,
            16, 17, 18, 16, 18, 19,
            20, 21, 22, 20, 22, 23,
        ]);

        let program = new ShaderProgram(gl, this, vertexShader, fragmentShader);

        let aPosition = new Attribute(gl, program, "aPosition", positions, 3, gl.FLOAT);
        let aColor = new Attribute(gl, program, "aColor", colors, 4, gl.FLOAT);
        
        let indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

        // Draw method
        this.draw = () => {
            program.use();

            aPosition.enable();
            aColor.enable();
            
            gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

            aColor.disable();
            aPosition.disable();
        };
    }
};