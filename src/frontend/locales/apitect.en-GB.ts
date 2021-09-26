const en = {
  translation: {
    app: {
      name: 'Apitect'
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
          submit: 'Register'
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
        required: '$t(form.fields.{{ field }}) is required'
      }
    },
    validation: {
      server: {
        userExists: 'User already exists',
        userNotFound: 'User not found',
        passwordWrong: 'Wrong password'
      }
    }
  }
}

export default en
