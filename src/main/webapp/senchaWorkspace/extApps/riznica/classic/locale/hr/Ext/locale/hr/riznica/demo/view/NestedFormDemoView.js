//noinspection MismatchedClassNameInspection
Ext.define("Ext.locale.hr.riznica.demo.view.NestedFormDemoView", {
  override: "riznica.demo.view.NestedFormDemoView",

  i18n: {
    loadTestDataText: "Testni podaci",
    resetText: "Resetiraj",

    employeeForm: {
      globalValidate: {
        startDateInvalidText: "Datum početka mora biti prije datuma završetka.",
        endDateInvalidText: "Datum završetka mora biti nakon datuma početka.",
        dateRangeGlobalMessageText: "Kod definiranja intervala datuma, datum početka mora biti prije datuma završetka.",

        phoneMissingText: "Telefon nije odabran."
      },

      firstPartFieldset: {
        titleText: "Prvi dio forme",
        fieldEmailLabelText: "Email adresa",
        fieldContainerDateRange: {
          labelText: "Period datuma",
          fieldStartDateLabelText: "Period datuma - početni datum",
          fieldEndDateLabelText: "Period datuma - završni datum"
        },
        fieldIncomeLabelText: "Prihod"
      },

      detailsFieldset: {
        titleText: "Detalji",
        nestedPhoneFormFieldsetTitleText: "Ugnježdena forma - Pretraživanje telefona",
        phoneSearchForm: {
          fieldSearchPhoneLabelText: "Telefon",
          clientValidationStatusNotificationTitleText: "Pretraživanje telefona",
          clientValidationStatusNotificationContentText: "Pretraživanje telefona"
        },
        buttonSearchPhoneText: "Pretraži telefone",
        foundPhonesGrid: {
          titleText: "Odaberi jedan telefon",
          columnPhone1Text: "Pozivni broj",
          columnPhone2Text: "Broj telefona"
        },
        clientValidationStatus: {
          validText: "Forma za pretraživanje telefona je ispravna",
          invalidText: "Forma za pretraživanje telefona nije ispravna"
        }
      },

      secondPartFieldset: {
        titleText: "Drugi dio forme",
        fieldContainerTimeWorked: {
          labelText: "Odrađeno",
          fieldHoursLabelText: "Odrađeno - sati",
          displayFieldHoursText: "sati",
          fieldMinutesLabelText: "Odrađeno - minute",
          displayFieldMinutesText: "min"
        },
        fieldContainerFullName: {
          labelText: "Puno ime",
          fieldTitleLabelText: "Titula",
          fieldFirstNameLabelText: "Puno ime - ime",
          fieldLastNameLabelText: "Puno ime - prezime"
        }
      },

      docked: {
        clientValidationStatus: {
          validText: "Forma je ispravna",
          invalidText: "Forma nije ispravna"
        },

        addEmailButtonText: "Dodaj email",
        addEmailWithCascadingValidationButtonText: "Dodaj email sa kaskadnom validacijom na poslužitelju"
      }
    },

    emailsGrid: {
      titleText: "Email adrese",
      columnFirstNameText: "Ime",
      columnLastNameText: "Prezime",
      columnEmailText: "Email adresa",
      columnPhone1EmailText: "Telefon"
    },

    outsideFormClientValidationStatus1: {
      validText: "Forma je skroz na skroz ispravna",
      invalidText: "Nda, ova forma ne bi bila baš dobra"
    }
  }
});
