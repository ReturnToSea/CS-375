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
                const vec4 frontColor = vec4(1.0, 1.0, 1.0, 1.0); // White for front-facing
                const vec4 backColor = vec4(1, 0.5, 0.5, 1.0); // Gray for back-facing
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



        let program = new ShaderProgram(gl, this, vertexShader, fragmentShader);

        let aPosition = new Attribute(gl, program, "aPosition", positions, 3, gl.FLOAT);

        this.draw = () => {
            program.use();

            aPosition.enable();

            // Draw the cube (12 triangles)
            gl.drawArrays(gl.TRIANGLES, 0, 36);

            // Clean up
            aPosition.disable();
            
        };
    }
};