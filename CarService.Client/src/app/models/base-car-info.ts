export class BaseCarInfo {
  constructor(
    public autoId?: number,
    public markName?: string,
    public modelName?: string,
    public year?: number,
    public photoLink?: string,
    public priceUSD?: number,
    public priceUAH?: number,
    public priceEUR?: number,
    public race?: string,
    public raceInt?: number,
    public city?: string,
    public fuelName?: string,
    public gearBoxName?: string,
    public description?: string
  ){ }
}