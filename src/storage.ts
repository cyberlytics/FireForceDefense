import Database from 'better-sqlite3'

export default class Storage {
    private db: Database.Database;

    constructor(file = './scores.sqlite') {
        this.db = new Database(file, {verbose: console.log});
    }

    public setup() {
        this.db.exec('create table if not exists `user`\n' +
            '(\n' +
            '    `id`       INTEGER not null\n' +
            '        constraint users_pk\n' +
            '            primary key autoincrement,\n' +
            '    `nickname` TEXT    not null\n' +
            ');\n');
        this.db.exec('create unique index if not exists user_nickname_uindex\n' +
            '    on user (nickname);');
        this.db.exec('create table if not exists `score`\n' +
            '(\n' +
            '    `id`    INTEGER not null\n' +
            '        constraint scores_pk\n' +
            '            primary key autoincrement,\n' +
            '    `user`  INTEGER not null,\n' +
            '    `level` TEXT    not null,\n' +
            '    `score` INTEGER not null\n' +
            ');\n');
        this.db.exec('create unique index if not exists score_level_user_uindex\n' +
            '    on `score` (level, user);\n' +
            '\n');
        return this;
    }

    public get(nickname: string, handler: (rows: any[]) => void) {
        const stmt = this.db.prepare('select * from `user` inner join `score` on `user`.`id` == `score`.`user` where `user`.`nickname` == ?');
        handler(stmt.all(nickname));
        return this;
    }

    public post(nickname: string, scores: {key: string, value: number}[]) {
        const insertScores = (userId: number) => {
            const stmt = this.db.prepare('replace into `score`(`user`, `level`, `score`) values (?, ?, ?)')
            scores.forEach((score) => {
                stmt.run([userId, score.key, score.value]);
            });
        }

        const userIdGetQuery = 'select `id` from `user` where `user`.`nickname` == ?';
        const stmt = this.db.prepare(userIdGetQuery);
        const row = stmt.get(nickname);
        if (row) {
            insertScores(row.id);
        } else {
            const userInsertStmt = this.db.prepare('insert into `user`(`nickname`) values (?) ');
            userInsertStmt.run(nickname);
            const userIdGetStmt = this.db.prepare(userIdGetQuery);
            const row = userIdGetStmt.get(nickname);
            if (!row) {
                throw 'User not found!';
            }
            insertScores(row.id);
        }
        return this;
    }

    public close() {
        this.db.close();
        console.log('Closed database connection!');
    }
}
