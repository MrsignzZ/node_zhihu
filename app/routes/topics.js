const Router = require('koa-router')
const jwt = require('koa-jwt')
const router = new Router({ prefix: '/topics' })
const { find, findById, create, update, checkTopicExist,
   listFollowersTopics, listQuestions } 
   = require('../controllers/topics')

const { secret } = require('../config')
const auth = jwt({ secret })


router.get('/', find)
router.post('/', auth, create)
router.get('/:id',checkTopicExist, findById)
router.patch('/:id', auth,checkTopicExist, update)

// 话题的关注者列表
router.get('/:id/followers', listFollowersTopics)

// 话题的问题列表
router.get('/:id/questions', checkTopicExist, listQuestions)

module.exports = router