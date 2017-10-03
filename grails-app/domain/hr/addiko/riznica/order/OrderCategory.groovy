package hr.addiko.riznica.order


class OrderCategory {

  Long id
  String name

  static constraints = {
    id nullable: true
    name nullable: true, blank: false
  }
}
