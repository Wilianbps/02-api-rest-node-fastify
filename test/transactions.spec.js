"use strict";
/* Estrutura de um teste
Enunciado - vai informar em forma de texto o que o teste vai realmente testar
Fazer o teste, por exemplo, uma chamada HTTP para criar uma nova transação
Validação se o teste foi bem sucedido
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const node_child_process_1 = require("node:child_process");
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../src/app");
(0, vitest_1.describe)('Transactions routes', () => {
    (0, vitest_1.beforeAll)(async () => {
        // verifica se todos os pluguins do fastify foram cadastrados, aguardar todas as promisses da aplicação
        await app_1.app.ready();
    });
    (0, vitest_1.afterAll)(async () => {
        // siginifica fechar a aplicação, basicamente remover a aplicação da memória, jogar fora, não utilizar mais
        await app_1.app.close();
    });
    (0, vitest_1.beforeEach)(() => {
        (0, node_child_process_1.execSync)('npm run knex migrate:rollback --all');
        (0, node_child_process_1.execSync)('npm run knex migrate:latest');
    });
    (0, vitest_1.it)('should be able to create a new transaction', async () => {
        const createTransactionResponse = await (0, supertest_1.default)(app_1.app.server)
            .post('/transactions')
            .send({
            title: 'New transction',
            amount: 5000,
            type: 'credit',
        });
        (0, vitest_1.expect)(createTransactionResponse.statusCode).toEqual(201);
        /*   const responseStatusCode = 201
        expect(responseStatusCode).toEqual(201) */
    });
    (0, vitest_1.it)('should be able to list all transactions', async () => {
        const createTransactionResponse = await (0, supertest_1.default)(app_1.app.server)
            .post('/transactions')
            .send({
            title: 'New transction',
            amount: 5000,
            type: 'credit',
        });
        const cookies = createTransactionResponse.get('Set-Cookie');
        const listTransactionsResponse = await (0, supertest_1.default)(app_1.app.server)
            .get('/transactions')
            .set('Cookie', cookies || [])
            .expect(200);
        (0, vitest_1.expect)(listTransactionsResponse.body.transactions).toEqual([
            vitest_1.expect.objectContaining({ title: 'New transction', amount: 5000 }),
        ]);
    });
    (0, vitest_1.it)('should be able to get a specific transaction', async () => {
        const createTransactionResponse = await (0, supertest_1.default)(app_1.app.server)
            .post('/transactions')
            .send({
            title: 'New transction',
            amount: 5000,
            type: 'credit',
        });
        const cookies = createTransactionResponse.get('Set-Cookie');
        const listTransactionsResponse = await (0, supertest_1.default)(app_1.app.server)
            .get('/transactions')
            .set('Cookie', cookies || [])
            .expect(200);
        const transactionId = listTransactionsResponse.body.transactions[0].id;
        const getTransactionResponse = await (0, supertest_1.default)(app_1.app.server)
            .get(`/transactions/${transactionId}`)
            .set('Cookie', cookies || [])
            .expect(200);
        (0, vitest_1.expect)(getTransactionResponse.body.transaction).toEqual(vitest_1.expect.objectContaining({ title: 'New transction', amount: 5000 }));
    });
    (0, vitest_1.it)('should be able to get the summary', async () => {
        const createTransactionResponse = await (0, supertest_1.default)(app_1.app.server)
            .post('/transactions')
            .send({
            title: 'Credit transction',
            amount: 5000,
            type: 'credit',
        });
        const cookies = createTransactionResponse.get('Set-Cookie');
        await (0, supertest_1.default)(app_1.app.server)
            .post('/transactions')
            .set('Cookie', cookies || [])
            .send({
            title: 'Debit transaction',
            amount: 2000,
            type: 'debit',
        });
        const summaryResponse = await (0, supertest_1.default)(app_1.app.server)
            .get('/transactions/summary')
            .set('Cookie', cookies || [])
            .expect(200);
        (0, vitest_1.expect)(summaryResponse.body.summary).toEqual({ amount: 3000 });
    });
});
