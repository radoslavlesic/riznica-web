package hr.addiko.riznica.order.product

import grails.plugin.grich.search.command.BaseSearchCommand
import hr.addiko.riznica.order.ProductCommand

class ProductController {

  ProductService productService

  def list() {
    BaseSearchCommand cmd = new BaseSearchCommand()
    cmd.limit = 0
    cmd.start = 0
    validateCallAndRender(cmd, { productService.list() })
  }

  def create(ProductCommand cmd) {
    validateCallAndRender(cmd, { productService.create(cmd) })
  }

  def update(ProductCommand cmd) {
    validateCallAndRender(cmd, { productService.update(cmd) })
  }

  def delete(ProductCommand cmd) {
    validateCallAndRender(cmd, { productService.delete(cmd) })
  }

}
