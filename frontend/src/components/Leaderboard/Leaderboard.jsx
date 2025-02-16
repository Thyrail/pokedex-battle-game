import { getLeaderboard } from "../../services/leaderboard";
import { useState, useEffect } from "react";
import "./leaderboard.css";

export default function Leaderboard()
{
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() =>
    {
        setLeaderboard(getLeaderboard());
    }, []);

    return (
        <div className="leaderboard-container">
            <h2>Leaderboard</h2>
            <ul>
                {leaderboard.map((player, index) => (
                    <li key={index}>
                        {index + 1}. {player.name} - {player.score} XP
                    </li>
                ))}
            </ul>
        </div>
    );

}