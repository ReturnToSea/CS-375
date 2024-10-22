/////////////////////////////////////////////////////////////////////////////
//  ExperimentalCube.js
//
//  An experimental cube implementation using procedural generation in the vertex shader
//

class ExperimentalCube {
    constructor(gl, vertexShader, fragmentShader) {
        // Vertex shader
        vertexShader ||= `
            in vec4 aPosition;
            in vec4 aColor;
            uniform mat4 P;
            uniform mat4 MV;

            out vec4 vColor;

            vec4 getCubeVertex(int index) {
                if (index == 0) return vec4(-0.5, -0.5, -0.5, 1.0); // Vertex 0
                if (index == 1) return vec4(0.5, -0.5, -0.5, 1.0);  // Vertex 1
                if (index == 2) return vec4(0.5, 0.5, -0.5, 1.0);   // Vertex 2
                if (index == 3) return vec4(-0.5, 0.5, -0.5, 1.0);  // Vertex 3
                if (index == 4) return vec4(-0.5, -0.5, 0.5, 1.0);  // Vertex 4
                if (index == 5) return vec4(0.5, -0.5, 0.5, 1.0);   // Vertex 5
                if (index == 6) return vec4(0.5, 0.5, 0.5, 1.0);    // Vertex 6
                if (index == 7) return vec4(-0.5, 0.5, 0.5, 1.0);   // Vertex 7
                return vec4(0.0);
            }

            void main() {
                int index = int(aPosition.x);
                gl_Position = P * MV * getCubeVertex(index);
                
                if (gl_Position.z > 0.0) {
                    vColor = vec4(1.0, 0.0, 0.0, 1.0); // Red for front
                } else {
                    vColor = vec4(0.0, 1.0, 0.0, 1.0); // Green for back
                }
            }
        `;

        // Fragment shader
        fragmentShader ||= `
            in vec4 vColor;
            out vec4 fColor;
            void main() {
                fColor = vColor;
            }
        `;
        //fColor = gl_FrontFacing ? frontColor : backColor;

        const indices = new Uint16Array([
            0, 1, 2, 0, 2, 3, // Front face
            4, 5, 6, 4, 6, 7, // Back face
            0, 1, 5, 0, 5, 4, // Bottom face
            3, 2, 6, 3, 6, 7, // Top face
            1, 2, 6, 1, 6, 5, // Right face
            0, 3, 7, 0, 7, 4  // Left face
        ]);


        const program = new ShaderProgram(gl, this, vertexShader, fragmentShader);


        const indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);


        const positions = new Float32Array(36);
        for (let i = 0; i < 36; i++) {
            positions[i] = i % 8;
        }

        const aPosition = new Attribute(gl, program, "aPosition", positions, 1, gl.FLOAT);

        this.draw = () => {
            program.use();

            aPosition.enable();
            gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

            aPosition.disable();
        };
    }
}