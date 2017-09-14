package hr.addiko.riznica.blog

import grails.plugin.grich.search.command.BaseSearchCommand
import grails.transaction.Transactional

@Transactional
class CategoryController {

    CategoryService categoryService

    def list() {
        BaseSearchCommand cmd = new BaseSearchCommand()
        cmd.limit = 0
        cmd.start = 0
        validateCallAndRender(cmd, {categoryService.list()})
    }

    def create(CategoryCommand cmd) {
        validateCallAndRender(cmd, { categoryService.create(cmd)})
    }

    def update(CategoryCommand cmd) {
        validateCallAndRender(cmd, { categoryService.update(cmd)})
    }

    def delete(CategoryCommand cmd) {
        validateCallAndRender(cmd, { categoryService.delete(cmd)})
    }
}
