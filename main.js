class Point {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    add(x, y, z) {
        
        this.x += x;
        this.y += y;
        this.z += z;
    }

    dot(p) {
        return this.x * p.x + this.y * p.y + this.z * p.z;
    }

    norm2() {
        return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
    }
}

class Cube {
    constructor() {

        this.vertices = [];

        this.vertices[0] = (new Point(0.5 , -0.5, 5));
        this.vertices[1] = (new Point(-0.5 , -0.5, 5));
        this.vertices[2] = (new Point(0.5 , 0.5, 5));
        this.vertices[3] = (new Point(-0.5 , 0.5, 5));
        
        this.vertices[4] = (new Point(0.5, -0.5, 4));
        this.vertices[5] = (new Point(-0.5, -0.5, 4));
        this.vertices[6] = (new Point(0.5, 0.5, 4));
        this.vertices[7] = (new Point(-0.5, 0.5, 4));

        for (let v = 0; v < this.vertices.length; v++){
            this.vertices[v].add(0, 0, 1 );
        }


        this.edges = [[0, 1], [0, 2], [2, 3], [1, 3], [4,5], [4, 6], [6,7], [5, 7], [0,4], [1,5], [2,6], [3, 7]];
    }

    add(x, y, z) {
        for (let v = 0; v < this.vertices.length; v++) {
            this.vertices[v].add(x, y, z);
        }
    }

    rotateAxis(axis, rad) {
        rad = rad % Math.PI;
        for (let v = 0; v < this.vertices.length; v++) {
            this.vertices[v].x += (Math.cos(rad) + axis.x*axis.x*(1-Math.cos(rad))) * this.vertices[v].x
            this.vertices[v].x += (axis.x*axis.y*(1 - Math.cos(rad)) - axis.z*Math.sin(rad)) * this.vertices[v].y
            this.vertices[v].x += (axis.x*axis.z*(1 - Math.cos(rad)) + axis.y*Math.sin(rad)) * this.vertices[v].z

            this.vertices[v].y += (axis.y*axis.x*(1 - Math.cos(rad)) + axis.z*Math.sin(rad)) * this.vertices[v].x
            this.vertices[v].y += (Math.cos(rad) + axis.y*axis.y*(1-Math.cos(rad))) * this.vertices[v].y
            this.vertices[v].y += (axis.y*axis.z*(1 - Math.cos(rad)) - axis.x*Math.sin(rad)) * this.vertices[v].z

            this.vertices[v].z += (axis.z*axis.x*(1 - Math.cos(rad)) - axis.y*Math.sin(rad)) * this.vertices[v].x
            this.vertices[v].z += (axis.z*axis.y*(1 - Math.cos(rad)) + axis.x*Math.sin(rad)) * this.vertices[v].y
            this.vertices[v].z += (Math.cos(rad) + axis.z*axis.z*(1-Math.cos(rad))) * this.vertices[v].z
        }
    }

    rotateX(rad) {
        for (let v = 0; v < this.vertices.length; v++) {
            this.vertices[v].x = this.vertices[v].x;
            this.vertices[v].y =  Math.cos(rad) * this.vertices[v].y - Math.sin(rad) * this.vertices[v].z;
            this.vertices[v].z = Math.sin(rad) * this.vertices[v].y + Math.cos(rad) * this.vertices[v].z;
        }
    }

    rotateY(rad) {
        for (let v = 0; v < this.vertices.length; v++) {
            this.vertices[v].x = Math.cos(rad) * this.vertices[v].x + Math.sin(rad) * this.vertices[v].z;
            this.vertices[v].y = this.vertices[v].y;
            this.vertices[v].z = -Math.sin(rad) * this.vertices[v].x + Math.cos(rad) * this.vertices[v].z;
        }
    }

    rotateZ(rad) {
        for (let v = 0; v < this.vertices.length; v++) {
            this.vertices[v].x = Math.cos(rad) * this.vertices[v].x - Math.sin(rad) * this.vertices[v].y;
            this.vertices[v].y = Math.sin(rad) * this.vertices[v].x + Math.cos(rad) * this.vertices[v].y;
            this.vertices[v].z = this.vertices[v].z;
        }
    }
}

