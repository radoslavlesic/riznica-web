package hr.addiko.riznica.blog

import grails.plugin.springsecurity.SpringSecurityService
import grails.transaction.Transactional
import hr.addiko.riznica.User

@Transactional
class CommentService {

    SpringSecurityService springSecurityService
    User u

    def list() {
        def result = Comment.findAll()

        [success: true, data: result]
    }

//    def listByPostId(CommentCommand cmd){
//        def result = Comment.findAllByPost(Post.findById(cmd.post.id))
//
//        [success: true, data: result]
//    }

    def listByPostId(CommentCommand cmd){
        u = (User)springSecurityService.getCurrentUser()

        def result = Comment.createCriteria().list{

            or {
                eq("post",Post.findById(cmd.post.id))
//                eq("user",User.findById(u.id))
            }
        }

        [success: true, data: result]
    }

    def create(CommentCommand cmd) {

        u = (User)springSecurityService.getCurrentUser()

        Comment comment = new Comment(
                content: cmd.content,
                user: User.findById(u.id),
                post: Post.findById(cmd.post.id)
        )
        comment.save()

        [success: true]
    }
}
