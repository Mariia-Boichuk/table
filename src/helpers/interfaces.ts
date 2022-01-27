export interface ITableItem {
    amount:number, id:string
}

export type Matrix= {
id:string,
row:ITableItem[]
}[]

export type MatrixRow= {
    id:string,
    row:ITableItem[]
    }