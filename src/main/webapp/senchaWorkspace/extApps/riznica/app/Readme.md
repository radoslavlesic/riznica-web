# ./module-name/controller

This folder contains the module's global application controllers. ViewControllers are located
alongside their respective view class in `"./module-name/view"`. These controllers are used for routing
and other activities that can span all application views.

# ./module-name/model

This folder contains the module's (data) Model classes.

# ./module-name/view

This folder contains the views as well as ViewModels and ViewControllers depending on the
application's architecture. Pure MVC applications may not have ViewModels, for example. For
MVCVM applications or MVC applications that use ViewControllers, the following directory
structure is recommended:

    foomodule/                  # Some meaningful module name for grouping all related classes
        ./view/
            Foo.js              # The view class
            FooController.js    # The controller for Foo (a ViewController)
            FooModel.js         # The ViewModel for Foo

This structure helps keep these closely related classes together and easily identifiable in
most tabbed IDE's or text editors.

# ./module-name/store

This folder contains any number of store instances or types that can then be reused in the
module.
