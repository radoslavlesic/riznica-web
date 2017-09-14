package hr.addiko.riznica.blog

import grails.validation.Validateable

class CategoryCommand implements Validateable{

    Long id
    String name

    static constraints = {
        id nullable: true
        name nullable: true
    }
}
