import Fastify from "fastify";

const PORT = 3333
const app = Fastify({
    logger: true
})

app.get("/healthcheck", (request, reply) => {
    return {'message' : 'server node is up and running'}
})

try {
    await app.listen({port : PORT})
} catch (error) {
    app.log.error('cant start node server with port 3333')
    process.exit(1)
}