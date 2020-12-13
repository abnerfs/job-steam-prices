import dotenv from 'dotenv';
dotenv.config();

import { getGames, savePrice, updateCurrentPrice } from "./repositories/game-repository";
import { getSteamGame } from "./services/steam-prices";

(async () => {
    try {
        const games = await getGames();

        for (const game of games) {
            console.log(`Obtendo jogo: ${game.AppId} ${game.Description}`)
            const steamGame = await getSteamGame(game.AppId, game.Currency);

            const price = steamGame.price_overview.final / 100.0;

            if(price != game.CurrentPrice) {
                console.log(`Preço atualizado para ${price}`)
                const savePricePromise = savePrice({
                    Currency: game.Currency,
                    GameId: game.GameId,
                    GamePriceId: 0,
                    Price: price,
                    PriceDate: new Date()
                });

                const saveCurrentPricePromise = updateCurrentPrice(game.GameId, price)
                await Promise.all([savePricePromise, saveCurrentPricePromise]);
            }
            else {
                console.log(`Mesmo preço ${price}`)
            }
        }
    }
    catch (error) {
        console.log(`Erro geral na aplicação: ${error.message}`)
    }
})();
