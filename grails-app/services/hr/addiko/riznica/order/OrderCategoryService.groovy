package hr.addiko.riznica.order

import grails.transaction.Transactional

@Transactional
class OrderCategoryService {

  def list(){
    def result = OrderCategory.findAll()

    [success: true, data: result]
  }

  def create(OrderCategoryCommand cmd) {
    OrderCategory category  = new OrderCategory(name: cmd.name)
    category.save()

    [success: true]
  }

  def update(OrderCategoryCommand cmd) {
    def cate = OrderCategory.get(cmd.id)
    cate.name = cmd.name
    cate.save(flush: true)

    [success: true]
  }

  def delete(OrderCategoryCommand cmd) {

    OrderCategory.findById(cmd.id).delete()

    [success: true]
  }

}
