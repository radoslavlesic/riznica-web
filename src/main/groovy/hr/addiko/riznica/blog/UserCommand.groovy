package hr.addiko.riznica.blog

import grails.validation.Validateable

class UserCommand implements Validateable{

    Long id
    String username
    String password

    static constraints={
        id nullable: true
        username nullable: true
        password nullable: true
    }
}
