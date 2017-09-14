package hr.addiko.riznica.blog

import grails.plugin.grich.search.command.BaseSearchCommand
import grails.transaction.Transactional

@Transactional
class PostController {

    PostService postService

    def list() {
        BaseSearchCommand cmd = new BaseSearchCommand()
        cmd.limit = 0
        cmd.start = 0
        validateCallAndRender(cmd, {postService.list()})
    }

    def listByCatId(PostCommand cmd){

        validateCallAndRender(cmd, {postService.listByCatId(cmd)})
    }

    def listByTitle(PostCommand cmd){
        validateCallAndRender(cmd, {postService.listByTitle(cmd)})
    }

    def findPost(PostCommand cmd){
        validateCallAndRender(cmd, {postService.findPost(cmd)})
    }

    def create(PostCommand cmd) {

        validateCallAndRender(cmd, { postService.create(cmd)})
    }

    def update(PostCommand cmd) {
        validateCallAndRender(cmd, { postService.update(cmd)})
    }

    def delete(PostCommand cmd) {
        validateCallAndRender(cmd, { postService.delete(cmd)})
    }
}
