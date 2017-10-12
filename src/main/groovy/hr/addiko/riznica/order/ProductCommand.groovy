package hr.addiko.riznica.order

import grails.plugin.grich.core.command.EntityCommand
import grails.plugin.grich.search.command.AdvancedSearchCommand
import grails.validation.Validateable
import hr.addiko.riznica.order.product.Product

class ProductCommand extends AdvancedSearchCommand implements Validateable{

  EntityCommand productType

  Long id
  String title
  String description
  Double price
  Float qty
  String image
  String thumbnail


  def getRootEntity(){
    productType?.searchClass ?:Product
  }

  static searchConfig= [
    rootEntity           : Product,
    initializeAdditional: ["id", "title", "price", "description"]

  ]

  static constraints = {
    start nullable: true
    limit nullable: true
    productType nullable: true
    id nullable: true
    title nullable:true
    description nullable: true
    price nullable: true
    qty nullable: true
    image nullable: true
    thumbnail nullable: true
  }
}
