import { Game, GamePrice } from "../models/game";
import { getConnection } from "../services/storage";


export const updateCurrentPrice = async (gameId: number, price: number) => {
    const query = `UPDATE T_Games SET CurrentPrice = ? WHERE GameId = ?`

    const con = getConnection();
    await con.query(query, [price, gameId]);
}

export const savePrice = async (price: GamePrice) => {
    const query = `INSERT INTO T_Games_Prices SET ?`

    const con = getConnection();
    await con.query(query, {
        GameId: price.GameId,
        Currency: price.Currency,
        Price: price.Price,
        PriceDate: price.PriceDate
    });
}


export const getGames = async () : Promise<Game[]> => {
    const query = `
        SELECT
            GameId,
            AppId,
            Description,
            Currency,
            CurrentPrice,
            Enabled
        FROM
            T_Games
        WHERE
            Enabled = 1
    `

    const con = getConnection();
    const [ rows ] = await con.query(query) as any;
    const results : Game[] = rows as Game[];
    return results;
}