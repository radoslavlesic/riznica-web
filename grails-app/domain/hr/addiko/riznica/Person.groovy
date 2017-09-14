package hr.addiko.riznica

class Person {
    String name
    String email
    String phone

    static constraints = {
        name blank: false
        email blank: false
        phone blank: false
    }

}
