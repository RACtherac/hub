/// <reference types="node" />

import { test } from "node:test";
import assert from "node:assert/strict";

import {
    PHASES,
    createGame,
    gameReducer,
    getScore,
    getWinner,
    pointsDestroyed,
    type GameAction,
    type GameState,
} from "./gameTracker";

function newGame(firstPlayer: 0 | 1 = 0) {
    return createGame(
        [
            { name: "Ada", faction: "Necrons", armyName: "Dynasty", units: [{ name: "Warriors", points: 90 }, { name: "Overlord", points: 85 }] },
            { name: "Bo", faction: "Orks", armyName: "", units: [] },
        ],
        firstPlayer,
        "Take and Hold"
    );
}

const run = (game: GameState, ...actions: GameAction[]) => actions.reduce(gameReducer, game);
const endTurn = (game: GameState) => run(game, ...PHASES.map(() => ({ type: "nextPhase" }) as const));

test("a new game starts in round 1, Command phase, with 1 CP each", () => {
    const game = newGame(1);

    assert.equal(game.round, 1);
    assert.equal(game.activePlayer, 1);
    assert.equal(game.phase, "command");
    assert.deepEqual(game.players.map(p => p.cp), [1, 1]);
});

test("turns alternate and the round advances after the second player", () => {
    let game = newGame(0);

    assert.equal(run(game, { type: "nextPhase" }).phase, "movement");

    game = endTurn(game);
    assert.equal(game.activePlayer, 1);
    assert.equal(game.round, 1);
    assert.equal(game.phase, "command");
    assert.deepEqual(game.players.map(p => p.cp), [2, 2], "both gain CP in every Command phase");

    game = endTurn(game);
    assert.equal(game.activePlayer, 0);
    assert.equal(game.round, 2);
});

test("the game ends after round 5", () => {
    let game = newGame(0);
    for (let turn = 0; turn < 10; turn++) game = endTurn(game);

    assert.equal(game.finished, true);
    assert.equal(game.round, 5);
    assert.equal(gameReducer(game, { type: "nextPhase" }), game, "a finished game ignores actions");
});

test("CP never goes below zero", () => {
    const game = run(newGame(), { type: "adjustCp", player: 0, delta: -1 }, { type: "adjustCp", player: 0, delta: -1 });
    assert.equal(game.players[0].cp, 0);
});

test("scores go into the current round and respect the caps", () => {
    let game = newGame();
    game = run(game, { type: "score", player: 0, kind: "primary", delta: 15 });
    game = endTurn(endTurn(game));
    game = run(game, { type: "score", player: 0, kind: "primary", delta: 5 }, { type: "score", player: 0, kind: "secondary", delta: 8 });

    assert.deepEqual(game.players[0].primary, [15, 5, 0, 0, 0]);
    assert.deepEqual(getScore(game.players[0]), { primary: 20, secondary: 8, painted: 0, total: 28 });

    game = run(game, { type: "score", player: 0, kind: "primary", delta: 60 }, { type: "togglePainted", player: 0 });
    assert.deepEqual(getScore(game.players[0]), { primary: 50, secondary: 8, painted: 10, total: 68 });
});

test("destroyed units add up their points and the winner is the higher total", () => {
    let game = newGame();
    const [warriors] = game.players[0].units;

    game = run(game, { type: "toggleUnit", player: 0, unitId: warriors.id }, { type: "score", player: 1, kind: "primary", delta: 5 });
    assert.equal(pointsDestroyed(game.players[0]), 90);
    assert.equal(getWinner(game), 1);

    game = run(game, { type: "endGame" });
    assert.equal(game.finished, true);
    assert.match(game.log[game.log.length - 1].text, /Bo wins/);
});

test("every change is written to the log", () => {
    const game = run(newGame(), { type: "adjustCp", player: 1, delta: -1 }, { type: "score", player: 0, kind: "secondary", delta: 3 });
    const texts = game.log.map(entry => entry.text);

    assert.ok(texts.some(text => text === "Bo spends 1 CP (0 left)."));
    assert.ok(texts.some(text => text === "Ada scores 3 secondary VP."));
});
