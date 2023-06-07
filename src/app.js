import express from "express"
import employeesRotes from './routes/employees.routes.js'
import indexRoutes from './routes/index.routes.js'

const app = express()

app.use(express.json())

app.use(indexRoutes)
app.use('/api',employeesRotes)

app.use((req,res,next) => {
    res.status(404).json({
        message: 'Endpoint Not Found'
    })
})

export default app