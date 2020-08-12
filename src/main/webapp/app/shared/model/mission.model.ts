export interface IMission {
  id?: number;
  name?: string;
  description?: string;
}

export class Mission implements IMission {
  constructor(public id?: number, public name?: string, public description?: string) {}
}
