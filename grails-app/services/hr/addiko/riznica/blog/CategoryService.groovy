package hr.addiko.riznica.blog

import grails.transaction.Transactional
import hr.addiko.riznica.blog.Category

@Transactional
class CategoryService {

    def list() {
        def result = Category.findAll()

        [success: true, data: result]
    }

    def create(CategoryCommand cmd) {
        Category category = new Category(name: cmd.name)
        category.save()

        [success: true]
    }

    def update(CategoryCommand cmd) {
        def cate = Category.get(cmd.id)
        cate.name = cmd.name
        cate.save(flush: true)

        [success: true]
    }

    def delete(CategoryCommand cmd) {

//        def postResult = Post.findByCategory(cmd.id)
//        def commentResult
//        if(postResult>=1){
//            commentResult = Comment.findByPost(postResult.id)
//            if(commentResult>=1){
//
//            }
//        }
        Category.findById(cmd.id).delete()

        [success: true]
    }
}
