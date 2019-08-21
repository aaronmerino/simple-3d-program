class Vec3 {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    add(v) {
        
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
    }

    dot(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }

    norm2() {
        return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
    }
}

class Cube {
    constructor() {

        this.vertices = [];

        this.vertices[0] = (new Vec3(0.5 , -0.5, 3));
        this.vertices[1] = (new Vec3(-0.5 , -0.5, 3));
        this.vertices[2] = (new Vec3(0.5 , 0.5, 3));
        this.vertices[3] = (new Vec3(-0.5 , 0.5, 3));
        
        this.vertices[4] = (new Vec3(0.5, -0.5, 2));
        this.vertices[5] = (new Vec3(-0.5, -0.5, 2));
        this.vertices[6] = (new Vec3(0.5, 0.5, 2));
        this.vertices[7] = (new Vec3(-0.5, 0.5, 2));

        for (let v = 0; v < this.vertices.length; v++){
            this.vertices[v].add(new Vec3(0, 0, 1));
        }


        this.edges = [[0, 1], [0, 2], [2, 3], [1, 3], [4,5], [4, 6], [6,7], [5, 7], [0,4], [1,5], [2,6], [3, 7]];
    }

    add(v) {
        for (let i = 0; i < this.vertices.length; i++) {
            this.vertices[i].add(v);
        }
    }

    rotateAxis(axis, rad) {
        rad = rad % Math.PI;
        for (let v = 0; v < this.vertices.length; v++) {
            let x = this.vertices[v].x;
            let y = this.vertices[v].y;
            let z = this.vertices[v].z;

            this.vertices[v].x = (Math.cos(rad) + axis.x*axis.x*(1-Math.cos(rad))) * x
            this.vertices[v].x += (axis.x*axis.y*(1 - Math.cos(rad)) - axis.z*Math.sin(rad)) * y
            this.vertices[v].x += (axis.x*axis.z*(1 - Math.cos(rad)) + axis.y*Math.sin(rad)) * z

            this.vertices[v].y = (axis.y*axis.x*(1 - Math.cos(rad)) + axis.z*Math.sin(rad)) * x
            this.vertices[v].y += (Math.cos(rad) + axis.y*axis.y*(1-Math.cos(rad))) * y
            this.vertices[v].y += (axis.y*axis.z*(1 - Math.cos(rad)) - axis.x*Math.sin(rad)) * z

            this.vertices[v].z = (axis.z*axis.x*(1 - Math.cos(rad)) - axis.y*Math.sin(rad)) * x
            this.vertices[v].z += (axis.z*axis.y*(1 - Math.cos(rad)) + axis.x*Math.sin(rad)) * y
            this.vertices[v].z += (Math.cos(rad) + axis.z*axis.z*(1-Math.cos(rad))) * z
        }
    }

    rotateX(rad) {
        for (let v = 0; v < this.vertices.length; v++) {
            let x = this.vertices[v].x;
            let y = this.vertices[v].y;
            let z = this.vertices[v].z;

            this.vertices[v].x = x;
            this.vertices[v].y =  Math.cos(rad) * y - Math.sin(rad) * z;
            this.vertices[v].z = Math.sin(rad) * y + Math.cos(rad) * z;
        }
    }

    rotateY(rad) {
        for (let v = 0; v < this.vertices.length; v++) {
            let x = this.vertices[v].x;
            let y = this.vertices[v].y;
            let z = this.vertices[v].z;

            this.vertices[v].x = Math.cos(rad) * x + Math.sin(rad) * z;
            this.vertices[v].y = y;
            this.vertices[v].z = -Math.sin(rad) * x + Math.cos(rad) * z;
        }
    }

    rotateZ(rad) {
        for (let v = 0; v < this.vertices.length; v++) {
            let x = this.vertices[v].x;
            let y = this.vertices[v].y;
            let z = this.vertices[v].z;

            this.vertices[v].x = Math.cos(rad) * x - Math.sin(rad) * y;
            this.vertices[v].y = Math.sin(rad) * x + Math.cos(rad) * y;
            this.vertices[v].z = z;
        }
    }
}

