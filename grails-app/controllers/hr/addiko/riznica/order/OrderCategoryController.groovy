package hr.addiko.riznica.order

import grails.plugin.grich.search.command.BaseSearchCommand

class OrderCategoryController {

  OrderCategoryService orderCategoryService

  def list(){
    BaseSearchCommand cmd = new BaseSearchCommand()
    cmd.limit = 0
    cmd.start = 0
    validateCallAndRender(cmd, {orderCategoryService.list()})
  }
  def create(OrderCategoryCommand cmd){
    validateCallAndRender(cmd,{orderCategoryService.create(cmd)})
  }

  def update(OrderCategoryCommand cmd){
    validateCallAndRender(cmd, {orderCategoryService.update(cmd)})
  }

  def delete(OrderCategoryCommand cmd){
    validateCallAndRender(cmd, {orderCategoryService.delete(cmd)})
  }
}
