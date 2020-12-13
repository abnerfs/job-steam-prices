import fetch from "node-fetch"
import { SteamGame } from "../models/steam-game"

export const getSteamGame = async (appId: string, currency: number) : Promise<SteamGame> => {

    const data = fetch(`https://store.steampowered.com/api/appdetails?appids=${appId}&currency=${currency}}`)
        .then(res => res.json())
        .then(x => x[appId].data as SteamGame)

    return data;
}