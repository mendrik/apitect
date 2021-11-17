const en = {
  translation: {
    app: {
      name: 'Apitect'
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
      unexpectedError: 'Oops! An unexpected error'
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
        string: {
          regexp: 'Regular expression',
          email: 'Must be a valid email'
        },
        object: {
          apiEndpoint: 'Accessible via REST api'
        },
        number: {
          integer: 'Integer'
        }
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
        password: 'Password',
        passwordRepeat: 'Repeat password',
        rememberMe: 'Remember me',
        submit: 'Login',
        regexp: 'Regular Expression'
      },
      validation: {
        sherlock: 'Unable not understand this expression',
        regexp: '$t(form.fields.{{ field }}) has invalid format',
        validRegExp: '$t(form.fields.{{ field }}) is not a valid regular expression',
        validEmail: '$t(form.fields.{{ field }}) is not valid',
        required: '$t(form.fields.{{ field }}) is required',
        password: '$t(form.fields.{{ field }}) must be at least 4 characters long'
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
