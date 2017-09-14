package hr.addiko.riznica

import grails.transaction.Transactional
import hr.addiko.riznica.core.command.PersonCommand

@Transactional
class PersonService {

    def list() {

        def result = Person.findAll()

        [success: true, data: result]
    }

    def create(PersonCommand cmd){

        Person person = new Person(name: cmd.name, email: cmd.email, phone: cmd.phone)
        person.save()

        [success: true]
    }

    def update(PersonCommand cmd){
        Person.executeUpdate(
                "UPDATE Person p SET " +
                "p.name=:newName, p.email=:newEmail, p.phone=:newPhone " +
                "WHERE p.id=:id",
                [newName:cmd.name, newEmail:cmd.email, newPhone:cmd.phone, id:cmd.id]
        )

        [success: true]
    }

    def delete(PersonCommand cmd){

        Person.findById(cmd.id).delete()

        [success: true]
    }

}
