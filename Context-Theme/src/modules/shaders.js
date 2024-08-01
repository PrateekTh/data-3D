// import { shaderMaterial } from "@react-three/drei";
const glsl = x => x;

class shader {
    vertex;
    fragment;

    constructor(vertex, fragment){
        this.vertex = vertex;
        this.fragment = fragment;
    }
}

//approach 1 - drei
// export const basicMaterial = new shaderMaterial(
//     //Uniforms
//     {},
//     //Vertex Shader
//     glsl`
//         void main(){
//             gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//         }

//     `,
//     //Fragment Shader
//     glsl`
//         void main(){
//             gl_FragColor = vec4(1.0, 0, 0, 1)
//         }
//     `
// );

//approach 2 - own
export const basicMaterial = new shader(
    //vertex 
    glsl`
        void main(){
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    
    `,
    //fragment
    
    glsl`
        void main(){
            gl_FragColor = vec4(1.0, 0, 0, 1)
        }
    `
);

// console.log(basicMaterial.vertex);