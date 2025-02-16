import { useEffect, useState } from "react";
import { fetchAllPokemon } from "../../services/pokemonApi";
import { saveScore } from "../../services/leaderboard";
import { getTypeMultiplier } from "../../utils/typeEffectiveness";
import "./Battle.css";

export default function Battle()
{
    const [playerPokemon, setPlayerPokemon] = useState(null);
    const [enemyPokemon, setEnemyPokemon] = useState(null);
    const [playerHp, setPlayerHp] = useState(100);
    const [enemyHp, setEnemyHp] = useState(100);
    const [battleLog, setBattleLog] = useState([]);
    const [playerName, setPlayerName] = useState("");
    const [winner, setWinner] = useState(null);

    useEffect(() =>
    {
        async function getPokemons()
        {
            const allPokemons = await fetchAllPokemon();
            if (!allPokemons || allPokemons.length === 0) return;

            const player = allPokemons[Math.floor(Math.random() * allPokemons.length)];
            const enemy = allPokemons[Math.floor(Math.random() * allPokemons.length)];

            setPlayerPokemon(player);
            setEnemyPokemon(enemy);
        }
        getPokemons();
    }, []);

    function attack(move)
    {
        if (!playerPokemon || !enemyPokemon || winner) return;

        const attackerType = playerPokemon.types[0].name;
        const defenderType = enemyPokemon.types[0].name;

        let playerDamage = Math.floor(Math.random() * 15) + 5;
        playerDamage *= getTypeMultiplier(attackerType, defenderType);
        playerDamage = Math.round(playerDamage);

        setEnemyHp(prev => Math.max(0, prev - playerDamage));
        setBattleLog(prev => [...prev, `${playerPokemon.name} used ${move.name}! It dealt ${playerDamage} damage.`]);

        if (enemyHp - playerDamage <= 0)
        {
            setWinner("player");
            saveScore(playerName.trim() || "Guest", 100);
            return;
        }

        setTimeout(() =>
        {
            const enemyMove = enemyPokemon.moves[Math.floor(Math.random() * enemyPokemon.moves.length)];
            const enemyAttackerType = enemyPokemon.types[0].name;
            const enemyDefenderType = playerPokemon.types[0].name;

            let enemyDamage = Math.floor(Math.random() * 15) + 5;
            enemyDamage *= getTypeMultiplier(enemyAttackerType, enemyDefenderType);
            enemyDamage = Math.round(enemyDamage);

            setPlayerHp(prev => Math.max(0, prev - enemyDamage));
            setBattleLog(prev => [...prev, `${enemyPokemon.name} used ${enemyMove.name}! It dealt ${enemyDamage} damage.`]);

            if (playerHp - enemyDamage <= 0)
            {
                setWinner("enemy");
            }
        }, 1000);
    }

    return (
        <div className="battle-container">
            <input
                type="text"
                placeholder="Enter your name"
                value={playerName}
                onChange={e => setPlayerName(e.target.value)}
            />

            {playerPokemon && enemyPokemon ? (
                <>
                    <div className="enemy">
                        <h2>{enemyPokemon.name}</h2>
                        <img src={enemyPokemon.sprite} alt={enemyPokemon.name} />
                        <p>HP: {enemyHp}</p>
                    </div>

                    <div className="player">
                        <h2>{playerPokemon.name}</h2>
                        <img src={playerPokemon.sprite} alt={playerPokemon.name} />
                        <p>HP: {playerHp}</p>
                        <div className="moves">
                            {playerPokemon.moves.map((move, index) => (
                                <button key={index} onClick={() => attack(move)}>
                                    {move.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="log">
                        {battleLog.map((entry, index) => (
                            <p key={index}>{entry}</p>
                        ))}
                    </div>

                    {winner && <h2>{winner === "player" ? "You Win! 🎉" : "You Lose! 😢"}</h2>}
                </>
            ) : (
                <p>Loading battle...</p>
            )}
        </div>
    );
}