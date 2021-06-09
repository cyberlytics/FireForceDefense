import Game from '@model/Game';
import Loeschtrupp from '@contents/Loeschtrupp';
import Loeschturm from '@contents/Loeschturm';
import Loeschkran from '@contents/Loeschkran';
import Loeschschiff from '@contents/Loeschschiff';
import Loeschzeppelin from '@contents/Loeschzeppelin';
import lvl001 from '@levels/lvl001';
import User from '@model/User';
import axios from 'axios';
import { mocked } from 'ts-jest/utils';
import Basis from '@contents/Basis';
import HexPosition from '@model/HexPosition';
jest.mock('axios');
const mockedAxios = mocked(axios, true);

describe('Game', () => {
    beforeEach(() => {
        User.getInstance().logout();
        User.getInstance().login('test-user-jest');
    });

    test('throw exception when unkown level id supplied', () => {
        expect(() => new Game('supercalifragilisticexpialidocious')).toThrow(Error);
    });

    test('buildable contents', () => {
        expect(Game.getBuildableContents()).toEqual([
            Loeschtrupp,
            Loeschturm,
            Loeschkran,
            Loeschschiff,
            Loeschzeppelin,
        ]);
    });

    test('isPlayable: true', () => {
        mockedAxios.get.mockImplementation((url) => {
            if (url.endsWith('/api/test-user-jest')) {
                return Promise.resolve({
                    data: {
                        nickname: 'test-user-jest',
                        scores: {},
                    },
                });
            } else {
                throw 'Wrong route!';
            }
        });
        const game = new Game('lvl001');
        // wait a second in order to allow the (faked) network request to be processed.
        setTimeout(() => expect(game.isPlayable).toBeTruthy(), 1000);
    });

    test('isPlayable: false', () => {
        mockedAxios.get.mockImplementation((url) => {
            if (url.endsWith('/api/test-user-jest')) {
                return Promise.resolve({
                    data: {
                        nickname: 'test-user-jest',
                        scores: {},
                    },
                });
            } else {
                throw 'Wrong route!';
            }
        });
        const game = new Game('lvl002');
        // wait a second in order to allow the (faked) network request to be processed.
        setTimeout(() => expect(game.isPlayable).toBeFalsy(), 1000);
    });

    test('get level map', () => {
        mockedAxios.get.mockImplementation((url) => {
            if (url.endsWith('/api/test-user-jest')) {
                return Promise.resolve({
                    data: {
                        nickname: 'test-user-jest',
                        scores: {},
                    },
                });
            } else {
                throw 'Wrong route!';
            }
        });
        const game = new Game('lvl001');
        expect(game.getLevelMap().getAllCells().length).toBe(lvl001.cellDefinitions.length);
    });

    test('base must be built at the beginning', () => {
        mockedAxios.get.mockImplementation((url) => {
            if (url.endsWith('/api/test-user-jest')) {
                return Promise.resolve({
                    data: {
                        nickname: 'test-user-jest',
                        scores: {},
                    },
                });
            } else {
                throw 'Wrong route!';
            }
        });
        const game = new Game('lvl001');
        expect(game.contentToBuild).toBe(Basis);
        game.contentToBuild = Loeschturm; // This must not have an effect because base must be built first.
        expect(game.contentToBuild).toBe(Basis);
        expect(game.getCellDisabledFunction()(game.getLevelMap().getCellAt(new HexPosition(0, 0)))).toBeFalsy();
        expect(game.getCellDisabledFunction()(game.getLevelMap().getCellAt(new HexPosition(3, 0)))).toBeTruthy();
    });

    test('game starts when base is built', () => {
        mockedAxios.get.mockImplementation((url) => {
            if (url.endsWith('/api/test-user-jest')) {
                return Promise.resolve({
                    data: {
                        nickname: 'test-user-jest',
                        scores: {},
                    },
                });
            } else {
                throw 'Wrong route!';
            }
        });
        const game = new Game('lvl001');
        const initialMoney = game.totalMoney;
        const pos = new HexPosition(0, 0);
        expect(game.contentToBuild).toBe(Basis);
        expect(game.placeAt(pos)).toBeTruthy();
        expect(game.totalMoney).toBe(initialMoney);
        expect(game.getLevelMap().getCellAt(pos).content.id).toBe('Basis');
        game.contentToBuild = null;
        expect(game.contentToBuild).toBeNull();
        // Indirectly check if the game has started by checking for money gain.
        setTimeout(() => expect(game.totalMoney).toBeGreaterThan(initialMoney), 1100);
    });
});
