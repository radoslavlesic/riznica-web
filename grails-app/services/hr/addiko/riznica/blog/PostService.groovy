package hr.addiko.riznica.blog

import grails.plugin.springsecurity.SpringSecurityService
import grails.transaction.Transactional
import hr.addiko.riznica.User

@Transactional
class PostService {

    Category cat

    SpringSecurityService springSecurityService

    def list() {
        def result = Post.findAll()

        [success: true, data: result]
    }

    def listByCatId(PostCommand cmd){

        def result = Post.createCriteria().list() {
            eq("category",Category.findById(cmd.category.id))
        }

        [success: true, data: result]
    }

    def listByTitle(PostCommand cmd){
        def result = Post.findAllByTitleIlike("%"+cmd.title+"%")

        [success: true, data: result]
    }

    def listByAuthor(PostCommand cmd){
        def result = Post.findAllByAuthorNameIlike("%"+cmd.authorName+"%")

        [success: true, data: result]
    }

    def listByDate(PostCommand cmd){
        def criteria = Post.createCriteria()
        def result = criteria.list(){
            gt('dateCreated', cmd.dateFrom)
            lt('dateCreated', (cmd.dateTo+1))
        }

        [success: true, data: result]
    }

    def findPost(PostCommand cmd){

        def result = Post.findAllByTitleLike("%"+cmd.title+"%")

        if(result.empty){
            result = Post.findAllByContentLike("%"+cmd.content+"%")
        }

        [success: true, data: result]
    }

    def create(PostCommand cmd) {

        User u = (User)springSecurityService.getCurrentUser()

        Post post = new Post(
                title: cmd.title,
                content: cmd.content,
                category: Category.findById(cmd.category.id),
                user: u,
                authorName: u.username
        )
        post.save(flush: true)

        [success: true]
    }

    def update(PostCommand cmd) {
        def post = Post.get(cmd.id)
        post.title = cmd.title
        post.content = cmd.content
        post.category = cmd.category
        post.save(flush: true)

        [success: true]
    }

    def delete(PostCommand cmd) {
        Post.findById(cmd.id).delete()

        [success: true]
    }
}
