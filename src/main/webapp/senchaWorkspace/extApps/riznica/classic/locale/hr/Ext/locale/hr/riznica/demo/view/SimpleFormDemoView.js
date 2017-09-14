//noinspection MismatchedClassNameInspection
Ext.define("Ext.locale.hr.riznica.demo.view.SimpleFormDemoView", {
  override: "riznica.demo.view.SimpleFormDemoView",

  i18n: {
    employeeForm: {
      globalValidate: {
        startDateInvalidText: "Datum početka mora biti prije datuma završetka.",
        endDateInvalidText: "Datum završetka mora biti nakon datuma početka.",
        dateRangeGlobalMessageText: "Kod definiranja intervala datuma, datum početka mora biti prije datuma završetka."
      },
      fieldEmailLabelText: "Email adresa",
      fieldContainerDateRange: {
        labelText: "Period datuma",
        fieldStartDateLabelText: "Period datuma - početni datum",
        fieldEndDateLabelText: "Period datuma - završni datum"
      },
      fieldIncomeLabelText: "Prihod",
      fieldsetDetails: {
        titleText: "Detalji",
        fieldContainerPhone: {
          labelText: "Telefon",
          fieldPhone1LabelText: "Tel 1",
          fieldPhone2LabelText: "Tel 2",
          fieldPhone3LabelText: "Tel 3"
        },
        fieldContainerTimeWorked: {
          labelText: "Odrađeno",
          fieldHoursLabelText: "Odrađeno - sati",
          fieldHoursDisplayText: "sati",
          fieldMinutesLabelText: "Odrađeno - minute",
          fieldMinutesDisplayText: "minute"
        },
        fieldContainerFullName: {
          labelText: "Puno ime",
          fieldTitle: {
            labelText: "Titula",
            combo: {
              mrName: "Gosp.",
              mrsName: "Gđa.",
              missName: "Gđica."
            }
          },
          fieldFirstNameLabelText: "Puno ime - ime",
          fieldLastNameLabelText: "Puno ime - prezime"
        }
      },
      docked: {
        insideFormBoundButtonSampleText: "Unutarnji 'Form Bound Button' primjer",
        secondClientValidationStatus: {
          validText: "Forma je ispravna",
          invalidText: "Forma nije ispravna"
        },

        loadTestDataText: "Testni podaci",
        resetText: "Resetiraj",

        saveMultiStoreComponentsText: "Spremi - Učitaj više 'store' komponenti",
        saveMultiStoreComponentsWithMaskViewText: "Spremi - Učitaj više 'store' komponenti i maskiraj cijeli 'view'",

        saveSingleStoreComponentText: "Spremi - Učitaj podatke u 'store' komoponentu",
        saveSingleStoreComponentWithServerValidationText: "Spremi sa validacijom na poslužitelju - Učitaj podatke u 'store' komoponentu",

        saveMaskComponentsText: "Save - Maskiranje komponenti",
        saveDisableComponentsText: "Save - Onemogućavanje komponenti",
        firstServerValidationStatus: {
          text: "Validacija na poslužitelju nije uspjela"
        },

        saveFormMaskDefaultText: "Spremi - osnovna maska",
        saveFormMaskCustomText: "Spremi - prilagođena maska",
        saveDisableFormButtonsText: "Spremi - onemogući gumbe forme",
        sampleDisabledButtonText: "Onemogućeni gumb"
      }
    },

    emailsGrid: {
      titleText: "Email adrese",
      columnFirstNameText: "Ime",
      columnLastNameText: "Prezime",
      columnEmailText: "Email adresa"
    },

    phonesGrid: {
      titleText: "Telefoni",
      columnFirstNameText: "Ime",
      columnLastNameText: "Prezime",
      columnPhone1EmailText: "Telefon"
    },

    outsideFormBoundButton1Text: "Vanjski 'Form Bound Button' primjer 1",
    outsideFormBoundButton2Text: "Vanjski 'Form Bound Button' primjer 2",
    outsideFormServerValidationStatus2: {
      text: "Poslužitelj odbio"
    }
  }
});
