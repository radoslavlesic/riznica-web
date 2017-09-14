package hr.addiko.riznica

import grails.transaction.Transactional
import hr.addiko.riznica.blog.UserCommand

@Transactional
class UserService {

    def list() {
        def result = User.findAll()

        [success: true, data: result]
    }

    def findByUserId(UserCommand cmd){
        def result = User.findById(cmd.id)
        [success: true, data: result]
    }

    def create(UserCommand cmd){
        new User(username: cmd.username, password: cmd.password, enabled: true).save(flush: true)

        [success: true]
    }

    def delete(UserCommand cmd){
        User.findById(cmd.id).delete()

        [success: true]
    }
}
