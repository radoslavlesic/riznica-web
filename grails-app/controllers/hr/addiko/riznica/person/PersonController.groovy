package hr.addiko.riznica.person


import grails.plugin.grich.search.command.BaseSearchCommand
import grails.transaction.Transactional
import grails.validation.Validateable
import hr.addiko.riznica.PersonService
import hr.addiko.riznica.core.command.PersonCommand

@Transactional
class PersonController {

    PersonService personService

    def list() {
        BaseSearchCommand cmd = new BaseSearchCommand()
        cmd.limit = 0
        cmd.start = 0
        validateCallAndRender(cmd, { personService.list() })
    }

    def create(PersonCommand cmd){
        validateCallAndRender(cmd, { personService.create(cmd) })
    }

    def update(PersonCommand cmd){
        validateCallAndRender(cmd, { personService.update(cmd) })
    }

    def delete(PersonCommand cmd){
        validateCallAndRender(cmd, { personService.delete(cmd) })

    }


}