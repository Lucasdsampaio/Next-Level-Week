import express, { request, response, Router } from 'express'
import PointsControllers from './controllers/PointsControllers'
import ItemsController from './controllers/ItemsControllers'
import multer from 'multer'
import multerConfig from './configuration/multer'
import { celebrate, Joi } from 'celebrate'

const routes = express.Router()
const upload = multer(multerConfig)

const pointsControllers = new PointsControllers()
const itemsController = new ItemsController()

routes.get('/items', itemsController.index)
routes.get('/points', pointsControllers.index)
routes.get('/points/:id', pointsControllers.show)

routes.post('/points',
    upload.single('image'),
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.number().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            items: Joi.string().required(),
        })
    }, {
        abortEarly: false
    }),
    pointsControllers.create)



//
//const users = [
//    'Diego',
//    'Cleiton',
//    'Robson'
//]
//
//routes.get('/', (request, response) => {
//    return response.json({ message: 'Hello World'})
//})
//
//routes.get('/users', (request, response) => {
//    console.log('Listagem de usuários')
//    const search = String(request.query.search)
//
//    const filteredUsers = search ? users.filter(user => user.includes(search)) : users
//
//    response.json(filteredUsers)
//})
//
//routes.get('/users/:id', (request, response) => {
//    const id = Number(request.params.id)
//    response.json(users[id])
//})
//
//routes.post('/users', (request, response) => {
//
//    const data = request.body
//    const user = {
//        name: data.name,
//        email: data.email
//    }
//    console.log(data)
//    return response.json(user)
//})

export default routes
