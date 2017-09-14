package hr.addiko.riznica.blog

import grails.validation.Validateable
import hr.addiko.riznica.User

class CommentCommand implements Validateable{

    Long id
    String content

    User user
    Post post

    static constraints = {
        id nullable: true
        content nullable: true
        user nullable: true
        post nullable: true
    }
}
