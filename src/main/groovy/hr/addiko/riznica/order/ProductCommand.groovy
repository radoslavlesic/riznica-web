package hr.addiko.riznica.order

import grails.validation.Validateable

class ProductCommand implements Validateable{

  Long id
  String title
  String description
  Double price
  String image

  static constraints = {
    id nullable: true
    title nullable:true
    description nullable: true
    price nullable: true
    image nullable: false
  }
}
