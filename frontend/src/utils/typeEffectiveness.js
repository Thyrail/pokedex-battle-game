export const typeChart = {
    normal: { strongAgainst: [], weakAgainst: ["fighting"], immuneTo: ["ghost"] },
    fire: { strongAgainst: ["grass", "ice", "bug", "steel"], weakAgainst: ["water", "rock", "fire"], immuneTo: [] },
    water: { strongAgainst: ["fire", "ground", "rock"], weakAgainst: ["water", "grass", "electric"], immuneTo: [] },
    grass: { strongAgainst: ["water", "ground", "rock"], weakAgainst: ["fire", "grass", "poison", "flying", "bug"], immuneTo: [] },
    electric: { strongAgainst: ["water", "flying"], weakAgainst: ["electric", "grass", "dragon"], immuneTo: ["ground"] },
    ice: { strongAgainst: ["grass", "ground", "flying", "dragon"], weakAgainst: ["fire", "water", "ice", "steel"], immuneTo: [] },
    fighting: { strongAgainst: ["normal", "ice", "rock", "dark", "steel"], weakAgainst: ["poison", "flying", "psychic", "bug", "fairy"], immuneTo: [] },
    poison: { strongAgainst: ["grass", "fairy"], weakAgainst: ["poison", "ground", "rock", "ghost"], immuneTo: ["steel"] },
    ground: { strongAgainst: ["fire", "electric", "poison", "rock", "steel"], weakAgainst: ["grass", "bug"], immuneTo: ["electric"] },
    flying: { strongAgainst: ["grass", "fighting", "bug"], weakAgainst: ["electric", "rock", "steel"], immuneTo: ["ground"] },
    psychic: { strongAgainst: ["fighting", "poison"], weakAgainst: ["psychic", "steel"], immuneTo: ["dark"] },
    bug: { strongAgainst: ["grass", "psychic", "dark"], weakAgainst: ["fire", "fighting", "poison", "flying", "ghost", "steel", "fairy"], immuneTo: [] },
    rock: { strongAgainst: ["fire", "ice", "flying", "bug"], weakAgainst: ["fighting", "ground", "steel"], immuneTo: [] },
    ghost: { strongAgainst: ["psychic", "ghost"], weakAgainst: ["dark"], immuneTo: ["normal", "fighting"] },
    dragon: { strongAgainst: ["dragon"], weakAgainst: ["steel"], immuneTo: ["fairy"] },
    dark: { strongAgainst: ["psychic", "ghost"], weakAgainst: ["fighting", "dark", "fairy"], immuneTo: [] },
    steel: { strongAgainst: ["ice", "rock", "fairy"], weakAgainst: ["fire", "fighting", "ground"], immuneTo: ["poison"] },
    fairy: { strongAgainst: ["fighting", "dragon", "dark"], weakAgainst: ["fire", "poison", "steel"], immuneTo: ["dragon"] },
};

/**
 * Berechnet den Schadens-Multiplikator basierend auf Typen.
 * - 1.15x für effektive Attacken
 * - 0.85x für Immunitäten
 * - 1x für neutrale Attacken
 */
export function getTypeMultiplier(attackerType, defenderType)
{
    const attackerData = typeChart[attackerType];
    if (!attackerData) return 1;

    if (attackerData.strongAgainst.includes(defenderType))
    {
        return 1.15; // 15% mehr Schaden
    }
    if (attackerData.immuneTo.includes(defenderType))
    {
        return 0.85; // 15% weniger Schaden
    }
    return 1;
}