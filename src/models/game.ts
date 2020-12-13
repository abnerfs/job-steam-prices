export interface Game {
    GameId: number;
    AppId: string;
    Description: string;
    Currency: number;
    CurrentPrice: number;
    Enabled: boolean;
}

export interface GamePrice {
    GamePriceId: number;
    GameId: number;
    Currency: number;
    Price: number;
    PriceDate: Date;
}