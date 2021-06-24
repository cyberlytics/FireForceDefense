// import server from '../Server';
// import request from 'supertest';
// import { setupDB } from './databaseTestSetup';
//
// const s = new server();
//
// setupDB();
// it('Should save user scores', async (done) => {
//     const res = await request(s.app).post('/game/score').send({
//         username: "dummy1",
//         level: "lvl001",
//         stars: 3,
//         money: 10,
//         burnedFields: 4,
//         time: 2
//     });
//     console.log(res.body)
//     expect(res.body.scoreData).toBeTruthy();
//     expect(res.body.message).toBe("New data inserted");
//     done();
// });
//
// it('Should get scoreboard', async (done) => {
//     const res = await request(s.app).post('/game/score').send({
//         username: "dummy1",
//         level: "lvl001",
//         stars: 3,
//         money: 10,
//         burnedFields: 4,
//         time: 2
//     });
//     console.log(res.body)
//     expect(res.body.scoreData).toBeTruthy();
//     expect(res.body.message).toBe("New data inserted");
//     done();
// });
