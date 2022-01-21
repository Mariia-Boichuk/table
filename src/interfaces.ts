export interface ITableItem {
    amount:number, id:string
}

export interface RowProps {i:number, row:ITableItem[], rowHovered:number,closeValues:ITableItem[],dispatch:Function, rowsSum:Array<number>}
export interface ICell {
    val:number,
    className:string,
    rowIndex:number
    columnIndex:number,
    ident:string,
    rowHovered:number,
    highlightCell:boolean,
    valuePercent:string,

}


