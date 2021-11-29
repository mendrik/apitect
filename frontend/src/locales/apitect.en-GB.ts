const en = {
  translation: {
    app: {
      name: 'Apitect',
      defaultValues: 'Values',
      tags: 'Select tags',
      tagSettings: 'Tag settings',
      download: 'Download'
    },
    common: {
      error: 'Error',
      success: 'Success',
      close: 'Close',
      cancel: 'Cancel',
      back: 'Back',
      confirm: 'Confirm',
      save: 'Save',
      delete: 'Delete',
      yesImSure: 'I am sure!',
      unexpectedError: 'Oops! An unexpected error',
      confirmation: 'Confirmation required',
      questions: {
        delete: 'Are you sure you want to delete this node? This action is irreversible.'
      }
    },
    modals: {
      newNode: {
        title: 'Create new node',
        submit: 'Create'
      },
      forgotPassword: {
        title: 'Forgot password?',
        info: 'If you have forgotten your password, please fill in your email and click the "send" button.',
        submit: 'Email me a reset link',
        success: 'We have sent you an email with further instruction on how to reset your password.'
      },
      authenticate: {
        title: 'Authentication',
        login: {
          title: 'Login',
          submit: 'Login',
          forgotPassword: 'Forgot password?'
        },
        register: {
          title: 'Register',
          submit: 'Register',
          success:
            'You have successfully registered to Apitect!<br/>' +
            'We have sent you a confirmation email with a login link inside.'
        }
      },
      nodeSettings: {
        title: 'Settings: {{ property }}',
        validation: 'Validation',
        appearance: 'Appearance',
        string: {
          none: 'No validation',
          regexp: 'Regular expression',
          email: 'Email',
          password: 'Password (values will be encrypted)'
        },
        object: {
          apiEndpoint: 'Accessible via REST api'
        },
        number: {
          min: 'Minimum',
          max: 'Maximum',
          step: 'Step',
          unit: 'Unit',
          precision: 'Precision'
        }
      },
      projectUserSettings: {
        title: 'Project users',
        info: 'Make sure email and password field belong to the same array-typed parent!',
        errors: {
          invalidParent:
            'Email and Password field must be descendants of the same array-typed parent node',
          invalidNodes: 'Invalid node types selected',
          emailType: 'Email field must be of type string with email constraint',
          passwordType: 'Password field must be of type string with password constraint'
        }
      },
      tagsSettings: {
        title: 'Tags',
        info: 'Tags represent copies of your project data. Furthermore tags can extend each other so that missing values can be resolved by looking up parent tags.'
      },
      userSettings: {
        title: 'User settings'
      }
    },
    navbar: {
      login: 'Login',
      logout: 'Logout'
    },
    form: {
      fields: {
        name: 'Name',
        nodeName: 'Name',
        nodeType: 'Type',
        email: 'E-Mail',
        emailId: 'E-Mail node',
        tags: 'Tags',
        passwordId: 'Password node',
        password: 'Password',
        passwordRepeat: 'Repeat password',
        rememberMe: 'Remember me',
        submit: 'Login',
        regexp: 'Regular Expression',
        number: 'Number',
        search: 'Search'
      },
      validation: {
        sherlock: 'Unable not understand this expression',
        regexp: '$t(form.fields.{{ field }}) has invalid format',
        validRegExp: '$t(form.fields.{{ field }}) is not a valid regular expression',
        validEmail: '$t(form.fields.{{ field }}) is not valid',
        required: '$t(form.fields.{{ field }}) is required',
        password:
          '$t(form.fields.{{ field }}) must be at least 6 characters long, 1 digit and 1 uppercase letter'
      }
    },
    validation: {
      server: {
        userExists: 'User already exists',
        userNotFound: 'User not found',
        passwordWrong: 'Wrong password',
        passwordMustMatch: "Password doesn't match",
        invalidId: 'ID must be a valid UUID'
      }
    }
  }
}

export default en
