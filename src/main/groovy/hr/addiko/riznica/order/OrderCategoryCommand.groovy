package hr.addiko.riznica.order

import grails.validation.Validateable

class OrderCategoryCommand implements Validateable {

  Long id
  String name

  static constraints = {
    id nullable: true
    name nullable: true
  }

}
