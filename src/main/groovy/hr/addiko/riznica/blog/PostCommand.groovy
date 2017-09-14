package hr.addiko.riznica.blog

import grails.validation.Validateable
import hr.addiko.riznica.User

class PostCommand implements Validateable{

    Long id
    Category category
    User user
    String title
    String content
//    String timestamp


    static constraints = {
        id nullable: true
        category nullable: true
        user nullable: true
        title nullable: true
        content nullable: true

    }
}
