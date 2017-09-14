package hr.addiko.riznica.blog

import grails.plugin.grich.search.command.BaseSearchCommand

class CommentController {

    CommentService commentService

    def list() {
        BaseSearchCommand cmd = new BaseSearchCommand()
        cmd.limit = 0
        cmd.start = 0
        validateCallAndRender(cmd, {commentService.list()})
    }

    def listByPostId(CommentCommand cmd){
        validateCallAndRender(cmd, {commentService.listByPostId(cmd)})

    }

    def create(CommentCommand cmd){
        validateCallAndRender(cmd, { commentService.create(cmd)})
    }

}
