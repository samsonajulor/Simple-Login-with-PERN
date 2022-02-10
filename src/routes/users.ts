import express, { Response } from 'express'
import { register, login, confirmEmail, logout } from '../controllers/auth'
const router = express.Router()

router.post('/', register)
// router.post('/', (res: Response)=>{
//  res.send('it is working ')
// })
router.get('/verify/:token', confirmEmail)
router.post('/login', login)
router.post('/logout', logout)

export default router
