const en = {
  translation: {
    app: {
      name: 'Apitect'
    },
    common: {
      success: 'Success',
      close: 'Close',
      confirm: 'Confirm',
      delete: 'Delete',
      yesImSure: 'I am sure!'
    },
    modals: {
      authenticate: {
        title: 'Authentication',
        login: {
          title: 'Login',
          submit: 'Login'
        },
        register: {
          title: 'Register',
          submit: 'Register',
          success:
            'You have successfully registered to Apitect!<br/>' +
            'We have sent you a confirmation email with a login link inside.'
        }
      }
    },
    navbar: {
      login: 'Login'
    },
    form: {
      fields: {
        name: 'Name',
        email: 'E-Mail',
        password: 'Password',
        passwordRepeat: 'Repeat password',
        rememberMe: 'Remember me',
        submit: 'Login'
      },
      validation: {
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
        passwordMustMatch: "Password doesn't match"
      }
    }
  }
}

export default en
