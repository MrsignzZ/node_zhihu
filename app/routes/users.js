const Router = require('koa-router')
const jwt = require('koa-jwt')
const router = new Router({ prefix: '/users' })
const { find, findById, create, update, delete: del,
  login, checkOwner, listFollowing, listFollowers,
  follow, unfollow, checkUserExist,
  followTopic, unfollowTopic, listFollowingTopics,
  listQuestions
}
  = require('../controllers/users')

const { checkTopicExist } = require('../controllers/topics')
const { secret } = require('../config')
const auth = jwt({ secret })

// 登录
router.post('/login', login)

// 用户
router.get('/', find)
router.post('/', create)
router.get('/:id', findById)
router.patch('/:id', auth, checkOwner, update)
router.delete('/:id', auth, checkOwner, del)

// 关注列表和粉丝列表
router.get('/:id/following', listFollowing)
router.get('/:id/followers', listFollowers)

// 关注和取消关注用户
router.put('/following/:id', auth, checkUserExist, follow)
router.delete('/following/:id', auth, checkUserExist, unfollow)

// 关注和取消关注话题
router.put('/followingTopics/:id', auth, checkTopicExist, followTopic)
router.delete('/followingTopics/:id', auth, checkTopicExist, unfollowTopic)
router.get('/:id/followingTopics', listFollowingTopics)

// 问题列表
router.get('/:id/questions', listQuestions)
module.exports = router