import express from 'express'
import { AppDataSource } from './data-source'
import routes from './routes/index'

AppDataSource.initialize().then(() => {
	const app = express()

	app.use(express.json())

    //app.get('/', (req,res)=>{
    //    return res.json('tudo certo')
    //})
	app.use(routes)

	return app.listen(process.env.PORT)
})