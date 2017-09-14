package hr.addiko.riznica

import grails.plugin.grich.search.command.BaseSearchCommand
import grails.plugin.springsecurity.SpringSecurityService
import hr.addiko.riznica.blog.UserCommand

class UserController {

    UserService userService
    SpringSecurityService springSecurityService

    def list(){
        BaseSearchCommand cmd = new BaseSearchCommand()
        cmd.limit = 0
        cmd.start = 0
        validateCallAndRender(cmd, { userService.list() })
    }

    def findByUserId(UserCommand cmd){
        validateCallAndRender(cmd, {userService.findByUserId(cmd)})
    }

    def create(UserCommand cmd){
        validateCallAndRender(cmd, {userService.create(cmd)})
    }

    def delete(UserCommand cmd){
        validateCallAndRender(cmd, {userService.delete(cmd)})    }
}
