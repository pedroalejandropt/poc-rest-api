import Entity from "./Entity";
import ArgumentException from "./Exceptions/ArgumentException";

export default class Softtek extends Entity {
    constructor(name: string, description: string) {
        super();
        this.name = name;
        this.description = description;
        if (!this.name) throw new ArgumentException(`The name is required`)
    }
}