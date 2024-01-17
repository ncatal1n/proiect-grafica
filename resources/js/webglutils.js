class WebGlUtils {
    constructor(gl, width, height) {
        this.gl = gl;
        this.width = width;
        this.height = height;
        this.initShaders();
    }

    initShaders() {
        const vertexShaderSource = `
            attribute vec2 a_position;
            void main() {
                gl_Position = vec4(a_position, 0.0, 1.0);
            }
        `;

        const fragmentShaderSource = `
            precision mediump float;
            uniform vec4 u_color;
            void main() {
                gl_FragColor = u_color;
            }
        `;

        const vertexShader = this.compileShader(this.gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = this.compileShader(this.gl.FRAGMENT_SHADER, fragmentShaderSource);

        this.program = this.gl.createProgram();
        this.gl.attachShader(this.program, vertexShader);
        this.gl.attachShader(this.program, fragmentShader);
        this.gl.linkProgram(this.program);

        if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
            console.error("Unable to initialize the shader program: " + this.gl.getProgramInfoLog(this.program));
        }

        this.gl.useProgram(this.program);

        this.positionAttrib = this.gl.getAttribLocation(this.program, "a_position");
        this.colorUniform = this.gl.getUniformLocation(this.program, "u_color");
    }

    compileShader(type, source) {
        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);

        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            console.error("Shader compilation failed: " + this.gl.getShaderInfoLog(shader));
            this.gl.deleteShader(shader);
            return null;
        }

        return shader;
    }


    hexToColorArray(hexColor, opacity = 1.0) {
        // Remove the '#' character if present
        hexColor = hexColor.replace(/^#/, '');

        // Parse hex values for red, green, and blue
        const bigint = parseInt(hexColor, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;

        // Normalize values to the range [0, 1]
        const normalizedColor = [r / 255, g / 255, b / 255, opacity];

        return normalizedColor;
    }

    drawRectangle(color, x, y, width, height, colorOpacity = 1.0) {
        // Convert coordinates to normalized range [-1, 1]
        const normalizedX = (2.0 * x) / this.width - 1.0;
        const normalizedY = 1.0 - (2.0 * y) / this.height;
        const normalizedWidth = (2.0 * width) / this.width;
        const normalizedHeight = -(2.0 * height) / this.height;
        color = this.hexToColorArray(color, colorOpacity);

        const vertices = new Float32Array([
            normalizedX, normalizedY,
            normalizedX + normalizedWidth, normalizedY,
            normalizedX, normalizedY + normalizedHeight,
            normalizedX, normalizedY + normalizedHeight,
            normalizedX + normalizedWidth, normalizedY,
            normalizedX + normalizedWidth, normalizedY + normalizedHeight,
        ]);

        this.drawGeometry(color, vertices);
    }

    drawCircle(color, x, y, radius, segments = 30) {
        // Convert coordinates to normalized range [-1, 1]
        const normalizedX = (2.0 * x) / this.width - 1.0;
        const normalizedY = 1.0 - (2.0 * y) / this.height;
        color = this.hexToColorArray(color);

        const angleIncrement = (2 * Math.PI) / segments;

        const vertices = [normalizedX, normalizedY];
        for (let i = 0; i <= segments; i++) {
            const angle = i * angleIncrement;
            const xPos = normalizedX + (radius / this.width) * Math.cos(angle);
            const yPos = normalizedY + (radius / this.height) * Math.sin(angle);
            vertices.push(xPos, yPos);
        }

        this.drawGeometryCircle(color,color, new Float32Array(vertices));
    }

    drawGeometry(color, vertices) {

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.gl.createBuffer());
        this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);
        this.gl.enableVertexAttribArray(this.positionAttrib);
        this.gl.vertexAttribPointer(this.positionAttrib, 2, this.gl.FLOAT, false, 0, 0);
        this.gl.uniform4fv(this.colorUniform, color);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, vertices.length / 2);
    }
    drawGeometryCircle(outerColor, innerColor, vertices) {
    
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.gl.createBuffer());
        this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);
    
        this.gl.enableVertexAttribArray(this.positionAttrib);
        this.gl.vertexAttribPointer(this.positionAttrib, 2, this.gl.FLOAT, false, 0, 0);
    
        // Draw the outer part of the circle with outerColor
        this.gl.uniform4fv(this.colorUniform, outerColor);
        this.gl.drawArrays(this.gl.TRIANGLE_FAN, 0, vertices.length / 2);
    
        // Draw the inner part of the circle with innerColor
        this.gl.uniform4fv(this.colorUniform, innerColor);
        this.gl.drawArrays(this.gl.TRIANGLE_FAN, 1, vertices.length / 2 - 1);
    }
    clear(){
        let color = this.hexToColorArray('191919');
        this.gl.clearColor(color[0], color[1], color[2], color[3]);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    }
}

export default WebGlUtils;