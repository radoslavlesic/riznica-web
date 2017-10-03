package hr.addiko.riznica.order.product

import grails.transaction.Transactional
import hr.addiko.riznica.order.ProductCommand

@Transactional
class ProductService {

  def list() {
    def result = Product.findAll()

//    [success: true, data: result]
    [success: true, data: result[0]]
  }

  def create(ProductCommand cmd) {
    Product product =
      new Product(title: cmd.title, description: cmd.description,
        price: cmd.price, image: cmd.image)
    product.save()

    [success: true]
  }

  def update(ProductCommand cmd) {
    def result = Product.get(cmd.id)
    result.title = cmd.title
    result.description = cmd.description
    result.price = cmd.price
    result.save(flush: true)

    [success: true]
  }

  def delete(ProductCommand cmd) {
    def result = Product.get(cmd.id)
    result.delete()

    [success: true]
  }
}